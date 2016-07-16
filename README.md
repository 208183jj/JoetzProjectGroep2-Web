# JoetzProjectGroep2-Web


### Running the server locally
Make sure Meteor and Mongo are both installed on your system.
In commandline, go to the project-directory, and then run the command using 
> Meteor --settings settings.json

### REST docs
Activities
#### GET api/v1/activities
Returns all activities, ordered by date.
#### POST api/v1/activity/add
required parameters:
place
timestamp
description

Returns success or failure, depending on the success of this operation.
#### POST api/v1/activity/attendance
Required parameters:
Attendance --> should be “yes”, ”no” or “maybe”
userId
campId 
Returns success after changing
Users
#### POST api/v1/user/reset
Required parameters:
email
sends an email to reset the password, and returns ‘email-sent’
#### POST api/v1/user/modify
required parameters
role
userId
--> admin / employee
tel
--> participant
member,
contact,
parent,
participant,
emergencyContact,
additionalInformation
Allows the user to modify his/her user data. If all the necessary data is entered, it returns ‘success’ after updating, but else it just returns ‘Not-Enough-Data’
#### POST api/v1/user/login
Required parameters:
email, 
password

Validates the sent password against the password corresponding to the user. If these match, the data of the user is returned.
#### POST api/v1/user/register
	Required parameters:
participant: 
password,
member,
contact,
parent,
participant,
emergencyContact,
additionalInfo
Admin / employee:
firstName, 
name, 
tel, 
email, 
role                          -->role is employee/admin/participant
Creates a new user account, and adds it to the corresponding db. In case of a participant: send verification email. Else (in case of admin or employee) send enrollment-email, to set the password.

The password is encrypted using bcrypt, and will be validated upon each login.

Admins or employees are created by an admin.
#### GET api/v1/users/:userId/history
Required parameters:
userId (_id of the user)
returns all camps of the current user
Camps
#### GET api/v1/camp/:_id
Required parameters: 
_id of the chosen camp
Returns this specific camp
#### POST api/v1/camp/register
Required parameters: 
campId,
userId
As long as the registration is not approved/denied by an admin, the registration will be stored in ‘pending’. 
Returns success after this operation is successfully finished.
#### POST api/v1/camp/add
Required parameters:
title, 
description, 
place, 
departuretime,   -->timestamp
returntime,   -->timestamp
price, 
minAge, 
maxAge, 
maxMembers, 
transport, 
formule, 
discounts, 
additionalInfo, 
contactInfo, 
employees  -->meereizende monitoren

returns success after adding the camp
#### POST api/v1/camp/registrations
Required parameters:
userId (of the admin who is changing this registration)
attendeeId (Id of the user whose registration will be changed)
campId (Id of the camp which the attendee would like to register)
comment (optional – only used when registration is denied. Could be used to show WHY the registration wasn’t allowed)
returns success on successfully changing the state of the registration
Employees
#### GET api/v1/employees/:userId
userId is required. Returns employee-information with corresponding Id
#### GET api/v1/employees
No  parameters --> returns an array of employees

