import axios from 'axios';
import React, {useState, useEffect } from 'react';
import "./Mentors.css";
import  { MentorsList } from "./UnregisteredMentors"
import {Mentor, MentorsContext} from './UsersContextProvider';

interface User {
    username: string,
    password: string,
}

function AddMentor() {

    const fetchData = async () => {

        await axios.get<User[]>("http://localhost:8080/api/users")
            .then((response) => {
                const usersDB = response.data;
                setUsers([])
                usersDB.map(user => {
                    users.push(user);
                })
            })

        await axios.get<Mentor[]>("http://localhost:8080/user/get/mentors/all")
            .then((response) => {
                const mentorsDB = response.data;
                setTempMentors([]);
                mentorsDB.map((mentor:Mentor) => {
                    tempMentors.push(mentor)
                    users.map((user: User) => {
                        if (mentor.firstName === user.username){
                            tempMentors.pop();
                        }
                    })
                })
            })

        setMentors(tempMentors);
    }

    const [users, setUsers] = useState<User[]>([]);
    const [mentors, setMentors] = useState<Mentor[]>([]);
    const [tempMentors, setTempMentors] = useState<Mentor[]>([]);

    useEffect (() => {
        fetchData();
    }, []);

    const addUser = async (id: number, updatedMentor: any) => {

        await axios.post<Mentor>('http://localhost:8080/user/add', {
            username: updatedMentor.firstName,
            password: updatedMentor.password
        })
        fetchData();
    }

  return (
    <div className='mentors'>
        <h1>List of unregistered mentors</h1>
        <MentorsContext.Provider value={{
            mentors, addUser
        }}>
            <MentorsList />
        </MentorsContext.Provider>
    </div>
  );
}

export default AddMentor;


