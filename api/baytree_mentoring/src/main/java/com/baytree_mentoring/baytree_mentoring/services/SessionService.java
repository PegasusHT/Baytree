package com.baytree_mentoring.baytree_mentoring.services;

import com.baytree_mentoring.baytree_mentoring.models.Session;
import com.baytree_mentoring.baytree_mentoring.repositories.SessionRepository;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.bind.JAXBContext;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.io.StringReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class SessionService {
    private final SessionRepository sessionRepository;

    public SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    public boolean isSessionFormComplete(Session ses) {
        if (ses.getClockOutTimeLocal().isEmpty()) {
            return false;
        }
        return true;
    }

    public void addSession(Session session) {
        sessionRepository.save(session);
    }

    public List<Session> getAllSession() {
        return sessionRepository.findAll();
    }

    public boolean isSessionAdded(Session session) {
        return sessionRepository.existsById(session.getMentoringSessionId());
    }

    public void deleteSession(long mentoringSessionId) {
        sessionRepository.deleteById(mentoringSessionId);
    }

    public void sendCompletedSessionFormToViews(Session ses) {
        int sessionId = -1;
        int contactId = -1;
        // hard code in 28 (Mercury Team) and 2 for Venue ID, for now
        String sessionUploadJson = formatSessionUploadJson(ses.getClockInTimeLocal(), ses.getClockOutTimeLocal(), "28", "2");
        // 10: Mercury Test Session Group
        HttpResponse<String> response = uploadSessionInformationToViews(sessionUploadJson, 10);
        if (response == null) {
            System.out.println("Failed to upload session information to views");
            return;
        }

        sessionId = parseSessionIdFromSessionUploadResponse(response);

        System.out.println("sessionId: " + sessionId);

        // contactId as Mercury Mentor (42) and Mercury Mentee2 (39)
        String sessionAttendanceJsonMentee = formatSessionAttendanceJson(39, 1);
        String sessionAttendanceJsonMentor = formatSessionAttendanceJson(42, 1);

        updateSessionWithAttendance(sessionId, sessionAttendanceJsonMentee);
        updateSessionWithAttendance(sessionId, sessionAttendanceJsonMentor);
    }

    public String formatSessionAttendanceJson(int contactId, int attended) {
        return "{\r\n    \"ContactID\": \""+contactId+"\",\r\n    \"Attended\": \""+attended+"\"\r\n}";
    }

    public String formatSessionUploadJson(String clockInTime, String clockOutTime, String leadStaff, String venueId) {
        // convert clockInTime 2021-10-10 22:14:00 -0930 YYYY-MM-DD
        Date clockInDate = null;
        Date clockOutDate = null;
        try {
            clockInDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(clockInTime);
            clockOutDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(clockOutTime);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        String startDate = clockInTime.substring(0,10);
        String startTime = clockInDate.toString().substring(11,19);
        long durationInMilliseconds = Math.abs(clockOutDate.getTime() - clockInDate.getTime());
        long duration = TimeUnit.HOURS.convert(durationInMilliseconds, TimeUnit.MILLISECONDS);
        String body = "{\r\n   \"StartDate\": \""+startDate+"\",\r\n   \"StartTime\": \""+startTime+"\",\r\n   \"Duration\": \""+duration+"\",\r\n   \"LeadStaff\": \""+leadStaff+"\",\r\n   \"VenueID\": \""+venueId+"\"\r\n}";
        return body;
    }

    private int parseSessionIdFromSessionUploadResponse(HttpResponse<String> response) {
        // Source: https://stackoverflow.com/questions/14159086/how-to-get-values-of-all-elements-from-xml-string-in-java
        int sessionId = -1;
        String sessionIdString = "";
        try {
            DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
            InputSource src = new InputSource();
            src.setCharacterStream(new StringReader(response.getBody().toString()));

            Document doc = builder.parse(src);
            sessionIdString = doc.getElementsByTagName("SessionID").item(0).getTextContent();
        } catch (ParserConfigurationException | SAXException | IOException e) {
            e.printStackTrace();
        }
        sessionId = Integer.parseInt(sessionIdString);
        return sessionId;
    }

    public static HttpResponse<String> uploadSessionInformationToViews(String body, int sessionGroupId) {
        Unirest.setTimeouts(0,0);
        HttpResponse<String> response = null;
        try {
            // hardcode upload to our test group for now
            response = Unirest.post("https://app.viewsapp.net/api/restful/work/sessiongroups/"+sessionGroupId+"/sessions")
                    .header("Content-Type", "application/json")
                    .basicAuth("group.mercury", "Mercury!$%12")
                    .body(body)
                    .asString();
            System.out.println(response.getBody().toString());
        } catch (UnirestException e) {
            e.printStackTrace();
            return null;
        }
        return response;
    }

    public static HttpResponse<String> updateSessionWithAttendance(int sessionId, String body) {
        System.out.println("updateSessionWithAttendance");
        System.out.println("sessionId: " + sessionId);
        System.out.println("body: " + body);
        Unirest.setTimeouts(0, 0);
        HttpResponse<String> response = null;
        try {
            response = Unirest.put("https://app.viewsapp.net/api/restful/work/sessiongroups/sessions/"+sessionId+"/participants")
                    .header("Content-Type", "application/json")
                    .basicAuth("group.mercury", "Mercury!$%12")
                    .body(body)
                    .asString();
            System.out.println(response.getBody().toString());
        } catch (UnirestException e) {
            e.printStackTrace();
            return null;
        }
        return response;
    }
}

