package com.baytree_mentoring.baytree_mentoring.services;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ViewsAPIJSONFormatterTest {
    @Test
    void formatSessionUploadJSONTest1() {
        ViewsAPIJSONFormatter viewsAPIJSONFormatter = new ViewsAPIJSONFormatter();
        String clockInTime = "2021-09-28 20:12:12";
        String clockOutTime = "2021-09-28 21:12:12";
        String leadStaff = "28";
        String venueId = "2";
        String correctString = "{\"StartDate\":\"2021-09-28\",\"StartTime\":\"20:12:12\",\"Duration\":\"1\"," +
                "\"LeadStaff\":\"28\",\"VenueID\":\"2\"}";
        String body = viewsAPIJSONFormatter.createSessionUploadJSON(clockInTime, clockOutTime, leadStaff, venueId);
        assertEquals(correctString, body);
    }
}