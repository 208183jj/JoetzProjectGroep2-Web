camps = new Mongo.Collection('Camps');
/*
 _id
 title
 description
 place
 departureTime
 returnTime
 attendees = [
     accepted = [{userId, timestamp}]
     pending = [{userId, timestamp}]
     denied = [{userId, comment, timestamp}]
 ]
 pictures
 price
 ages
 maxMembers
 transport
 formule
 discounts
 additionalInfo
 contactInfo
 employees = [{userId}]
 */ 

activities = new Mongo.Collection('Activities');
/*
 _id
  timestamp
  title
  place
  description
  attending
  notSure
  absent
 */
//users is generated automatically by accounts-password and accounts-facebook
participants = new Mongo.Collection('Participants');
/*
  _id  --> gekoppeld aan users-tabel
  member: {aansluitingsnummer1 (optioneel) 
        aansluitingsnummer2 (optioneel)
        code
        }
  contact: {
      national-identification-number
      voornaam
      naam
      straat
      huisnummer en bus
      gemeente
      postcode
      e-mail
      telefoon
  }
  parent: {
      national-identification-number
      voornaam
      naam
      straat
      huisnummer en bus
      gemeente
      postcode
      e-mail
      telefoon
  }
  participant: {
      national-identification-number
      voornaam
      naam
      geboortedatum
      straat
      huisnummer bus
      gemeente
      postcode
  }
  EmergencyContact: {
      voornaam
      naam
      telefoon
  }
  AdditionalInformation: 
 */
employees = new Mongo.Collection('Employees');
/*
  _id --> gekoppeld aan users tabel
  firstName
  name
  tel
  email
  role -->medewerker/monitor/beheerder/...
 */