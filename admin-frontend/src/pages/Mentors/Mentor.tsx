import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Tabs, Tab} from 'react-bootstrap';

import sessionsData from '../../assets/dummy-data/mentor28/SessionsPruned.json';
import questionnairesData from '../../assets/dummy-data/mentor28/QuestionnairesPruned.json';

import MentorInfo from './MentorInfo';
import MentorSession from './MentorSessions';
import MentorQuestionnaire from './MentorQuestionnaires';
import { useLocation } from 'react-router-dom';
import { MentorInterface } from './MentorInterface';

function Mentor() {
    const state = useLocation().state as MentorInterface;
    return (
        <div className='mentor'>
            <h1>Mentor Overview</h1>
            <Tabs defaultActiveKey="info" className = 'tab'>
                <Tab eventKey="info" title="Personal Information">
                    {MentorInfo(state)}
                </Tab>

                <Tab eventKey="sessions" title="Sessions">
                    {sessionsData.map(MentorSession)}
                </Tab>

                <Tab eventKey="questionnaire" title="Questionnaires">
                    {questionnairesData.map(MentorQuestionnaire)}
                </Tab>
            </Tabs>
        </div>
    )
}

export default Mentor;