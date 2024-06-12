"use client";
import { useEffect, useState } from "react";
import Image from 'next/image';
import axios from 'axios';

import styles from "./AttendanceSection.module.scss";
import { useSession } from "next-auth/react";

interface Attendee {
  id: number;
  event_id: number;
  name: string;
  email: string;
  venmo_handle: string;
  phone_number: string;
  photo_url: string;
}

interface AttendanceSectionProps {
  attendees: Attendee[];
  fetchAttendees: () => void;
}


const AttendanceSection: React.FC<AttendanceSectionProps> = ({ attendees, fetchAttendees }) => {
  const { data: session } = useSession();

  console.log("<AttendanceSection> with attendees:", attendees);

  useEffect(()=> {
    console.log("attendanceSection mounting");
    fetchAttendees();
  },[]); //mounting

  useEffect(() => {
    if (session){
      console.log("attendanceSection session changed");
      fetchAttendees();
    }
  }, [session]);


  //maybe another one for component mount
  console.log("attendees", attendees);

  return (
    <>
      <div className={styles.attendanceSection}>
        <div className={styles.attendanceTitle}>
          Attendance
        </div>
        <div className={styles.attendeesContainer}>
          {attendees.map((attendee, idx) => {

            return (
              <div
                key={idx}
                className={styles.attendeeContainer}
              >
                <div className={styles.attendeePicture}>
                  <Image
                    src={attendee.photo_url}
                    alt={"ProfilePic"}
                    width={100}
                    height={100}
                  />
                </div>
                <div className={styles.attendeeName}>
                  {attendee.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AttendanceSection;

