**Intro**
<p>
An application for managing mentor/mentee relationships at the Baytree
Centre in London. There are 3 components to the application. The
<b>user-frontend</b> is seen by the mentor when they want to upload information 
regarding mentoring sessions or access resources. 
The <b>admin-frontend</b> allows an administrator at Baytree to manage accounts, access statistics, etc. 
The backend is used to receive and process API requests 
from the frontends as well as manage the database. The client is using the Views application, 
an application to manage the employees. Therefore, we use some data from the Views database also by sending API requests.
The frontend is implemented with React TypeScript and the backend is implemented
with Java Spring boot.
</p>

**My accomplishments**<br>
The project was built by eight people. Below is the list of my features.
1. <b>Designed the user-frontend:</b> I designed a prototype for a user-frontend website and
   successfully implemented it with HTML, CSS, and React. The website is responsive
   and has nice-looking layouts for laptop and mobile screen sizes.
2. <b>Developed mentor feature:</b> It's a feature in the admin-frontend. The application will
   get the mentor data from the Views database, and display a list of unregistered mentors in our database.
   The admin can select a mentor, set the password, and create that user in our database.
3. <b>Created backend for goals feature:</b>
   I developed the models, endpoints for the goals feature. We can send API requests
   to create, get all goals or specific goal data, or delete a goal.
   I also created some test functions to test the goal backend to make sure
   it works fine.

### Requirements to run application
**User-Frontend**
<p>
Make sure you have Node Package Manager installed before attempting to run the user-frontend. To start the user-frontend, change directory to user-frontend in your terminal. Then enter npm install in terminal. Then enter npm start. The application should start in a browser.  
</p>

**Admin-Frontend**
<p>
Make sure you have Node Package Manager installed before attempting to run the admin-frontend. To start the admin-frontend, change directory to admin-frontend in your terminal. Then enter npm install in terminal. Then enter npm start. The application should start in a browser.
</p>


****Backend****

- Load the directory named API on IntelliJ
- Before running the application make sure you have JDK and maven installed on your machine
- Run the application on IntelliJ
    - Build the project using `mvn dependency:tree` Make sure you in the directory "baytree_mentoring" which has the pom file   
    - To run the application open the file BaytreeMentoringApplication (api > baytree_mentoring > src > main > java > )
        - When in file "BaytreeMentoringApplication" to run the application simply click the run button on the line number 9.    
    - The server should be up and running 

- You have to connect to the SFU VPN to get the data, since we use the SFU Virtual Machine.

