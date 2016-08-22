import {
  Mongo
}
from 'meteor/mongo';
import {
  Meteor
}
from 'meteor/meteor';
import {
  check
}
from 'meteor/check';
Meteor.methods({
  'users.history.get' (_userId) {
    var tempUser = Meteor.users.findOne({
      _id: _userId
    });
    var history;
    //crossreference this with camps db, to get full history
    _.each(tempUser.camps, function (x) {
      history.push(camps.findOne({
        _id: x
      }));
    });
    return history;
  },
  'camp.upcomping.get' () {
    return camps.find({
      _id: _id,
      departureTime: {
        $gte: new Date()
      }
    }).fetch();
  },
  'camp.get' (_id) {
    return camps.find({
      _id: _id
    }).fetch();
  },
  'employees.get' () {
    return employees.find({}).fetch();
  },
  'employees.getOne' (_id) {
    return employees.findOne({
      _id: userId
    });
  },
  'activities.get' () {
    return activities.find({}, {
      timestamp: -1
    }).fetch();
  },
  'camp.register' (campId, userId) {
    var camp = camps.findOne({
      _id: campId
    });
    if (!camp.attendees.accepted)
      camp.attendees.accepted = [];
    if (!camp.attendees.pending)
      camp.attendees.pending = [];
    if (camp.attendees.accepted.length + camp.attendees.pending.length >= camp.maxMembers)
      return "Camp-full";
    if (campId, userId) {
      camps.update({
        _id: campId
      }, {
        $push: {
          'attendees.pending': {
            userId: userId,
            timestamp: new Date()
          }
        }
      });
      return 'success';
    }
    return 'failure';
  },
  'camp.add' (title, desc, place, depTime, returnTime, price, minAge, maxAge, maxMembers, transport, formule, discounts, additionalInfo, contactInfo, employees) {
    if (title && description && place && departureTime && returnTime && price && minAge && maxAge && maxMembers && transport && formule && discounts && additionalInfo && contactInfo && employees) {
      camps.insert({
        title: title,
        description: description,
        place: place,
        departureTime: departureTime,
        returnTime: returnTime,
        attendees: {},
        price: price,
        minAge: minAge,
        maxAge: maxAge,
        maxMembers: maxMembers,
        transport: transport,
        formule: formule,
        discounts: discounts,
        additionalInfo: additionalInfo,
        contactInfo: contactInfo,
        employees: employees
      });
      return "success";
    } else
      return "failure";
  },
  'activity.add' (title, place, timestamp, desc) {
    if (title && place && timestamp && description) {
      activities.insert({
        title: title,
        place: place,
        timestamp: timestamp,
        description: description,
        attending: [],
        notSure: [],
        absent: []
      });
      return "success";
    }
    return "failure";
  },
  'camp.registrations' (userId, attendeeId, campId, attendance) {
    if (userId && attendeeId && campId) {
      if (attendance === "accepted") {
        camps.update({
          _id: campId
        }, {
          $addToSet: {
            "attendees.accepted": {
              "userId": attendeeId,
              "timestamp": new Date()
            }
          }
        });
        camps.update({
          _id: campId
        }, {
          $pull: {
            "attendees.pending": {
              "userId": attendeeId,
              "timestamp": new Date()
            }
          }
        });
        return "success";
      } else {
        camps.update({
          _id: campId
        }, {
          $addToSet: {
            "attendees.denied": {
              "userId": attendeeId,
              "comment": comment,
              "timestamp": new Date()
            }
          }
        });
        camps.update({
          _id: campId
        }, {
          $pull: {
            "attendees.pending": {
              "userId": attendeeId,
              "timestamp": new Date()
            }
          }
        });
        return "success";
      }
    }
    return "failure";
  },
  'camp.employees.add' (userId, empId,  campId){
    if(userId&&empId&&campId)
      {
        camps.update({
          _id: campId
        }, {
          $addToSet: {
            employees: {
              "userId": empId
            }
          }
        })
      }
  },
  'activity.attendance' (attendance, campId, userId) {
    if (attendance && campId && userId) {
      switch (attendance) {
      case "yes":
        activities.update({
          _id: campId
        }, {
          $push: {
            attending: {
              timestamp: new Date(),
              user: userId
            }
          }
        });
        break;
      case "no":
        activities.update({
          _id: campId
        }, {
          $push: {
            absent: {
              timestamp: new Date(),
              user: userId
            }
          }
        });
        break;
      case "maybe":
        {
          activities.update({
            _id: campId
          }, {
            $push: {
              notSure: {
                timestamp: new Date(),
                user: userId
              }
            }
          });
          break;
        }
      }
      return "success";
    } else
      return "failure";
  },
  'user.login' (email, password) {
    var user = Accounts.findUserByEmail(email);
    if (!ApiPassword.validate({
        email: user.emails[0].address,
        password: password
      })) {
      return "Unknown combination";
    }
    if (user.profile.role === "admin" || user.profile.role === "employee")
      return employees.findOne({
        _id: user._id
      });
    else
      return participants.findOne({
        _id: user._id
      });
  },
  'participant.register' (email, password, member, contact, parent, participant, emergencyContact, additionalInfo) {
    var role = "participant";
    if (email && password && member && contact && parent && participant && emergencyContact && additionalInfo) {
      var id = Accounts.createUser({
        email: email,
        password: password,
        profile: {
          role: role
        }
      });
      Accounts.sendVerificationEmail(id);
      participants.insert({
        _id: id,
        member: member,
        contact: contact,
        parent: parent,
        participant: participant,
        emergencyContact: emergencyContact,
        additionalInfo: additionalInfo
      });
      return "success";
    }
  },
  'employee.register' (role, email, firstName, name, tel, email) {
    if (email && role) {
      if (role && role !== "participant") {
        if (firstName && name && tel && email && role) {
          var id = Accounts.createUser({
            email: email,
            profile: {
              role: role
            }
          });
          Accounts.sendEnrollmentEmail(id);
          employees.insert({
            _id: id,
            firstName: firstName,
            name: name,
            tel: tel,
            email: email,
            role: role
          });
          return "success";
        }
      }
    }
  },
  'user.reset' (email) {
    Accounts.sendResetPasswordEmail(Accounts.findUserByEmail(email)._id);
    return "email-sent";
  },
  'employee.modify' (userId, tel) {
    var user = Meteor.users.findOne({
      _id: userId
    });
    if (user) {
      if (user.profile.role === "admin" || user.profile.role === "employee") {
        if (tel) {
          employees.update({
            _id: userId
          }, {
            $set: {
              tel: tel
            }
          });
          return "success";
        }
        return "Not-Enough-Data";
      }
    }
  },
  'participant.modify' (userId, member, contact, parent, participant, emergencyContact, additionalInformation) {
    var user = Meteor.users.findOne({
      _id: userId
    });
    if (user) {
      if (user.profile.role !== "admin" || user.profile.role !== "employee") {
        if (member && contact && parent && participant && emergencyContact && additionalInformation) {
          participants.update({
            _id: userId
          }, {
            member: member,
            contact: contact,
            parent: parent,
            participant: participant,
            emergencyContact: emergencyContact,
            additionalInformation: additionalInformation
          });
          return "success";
        }
        return "Not-Enough-Data";
      }
    }
  }
});
