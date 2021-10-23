package com.baytree_mentoring.baytree_mentoring.controllers;

import com.baytree_mentoring.baytree_mentoring.exceptions.FailedSessionAddingException;
import com.baytree_mentoring.baytree_mentoring.models.Session;
import com.baytree_mentoring.baytree_mentoring.services.SessionService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SessionController {
    private final SessionService sessionService;

    private static final String SUCCESS = "Session Added";

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    // TODO: Make this cross origin config global (for all controllers, not just SessionController)
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/session/add")
    private String addSession(@RequestBody Session ses) {
        if (sessionService.isSessionFormComplete(ses)) {
            // Send straight to Views
            System.out.println("SessionController: Session form sent to backend is complete");
            System.out.println("Sending form straight to views, don't add it to the database");
            sessionService.sendCompletedSessionFormToViews(ses);
            if (sessionService.isSessionAdded(ses)) {
                return SUCCESS;
            } else{
                String error = "Failed to add the Session.";
                throw new FailedSessionAddingException(error);
            }
        } else {
            // Session form is incomplete (missing clock out time), need to save in database until completed
            Session session = new Session(ses.getMenteeId(), ses.getMentorId(), ses.getMentoringSessionId(),
                    ses.getClockInTimeLocal(), ses.getClockOutTimeLocal(), ses.getLeadStaffId(),
                    ses.getSessionNotes());
            sessionService.addSession(session);

            List<Session> sessions = sessionService.getAllSession();

            for(Session s : sessions) {
                if(s.getMentoringSessionId() == session.getMentoringSessionId()) {
                    return SUCCESS;
                }
            }
        }

        String error = "Failed to add the Session.";
        throw new FailedSessionAddingException(error);
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/session/get/all")
    private List<Session> getAllSession() {
        return sessionService.getAllSession();
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/session/delete/{mentoringSessionId}")
    public void deleteStudent(@PathVariable long mentoringSessionId) {
        sessionService.deleteSession(mentoringSessionId);
    }
}

