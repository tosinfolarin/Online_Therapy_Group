-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Oct 30, 2022 at 09:54 AM
-- Server version: 8.0.24
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online_therapy_group`
--

-- --------------------------------------------------------

--
-- Table structure for table `Consultations`
--

CREATE TABLE `Consultations` (
  `ConsultationID` varchar(30) NOT NULL,
  `C_Type` varchar(30) NOT NULL,
  `C_Date` date NOT NULL,
  `C_Time` varchar(20) NOT NULL,
  `C_Duration` varchar(10) NOT NULL,
  `PatientID` varchar(15) NOT NULL,
  `Therapist_Reg_No` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Consultations`
--

INSERT INTO `Consultations` (`ConsultationID`, `C_Type`, `C_Date`, `C_Time`, `C_Duration`, `PatientID`, `Therapist_Reg_No`) VALUES
('C1', 'Phone Call', '2024-02-10', '08:00', '1 Hour', 'PID3', 'T333AA'),
('C2', 'Phone Call', '2024-02-12', '09:00', '30 minutes', 'PID1', 'T111AA'),
('C3', 'Text', '2024-03-11', '12:00', '30 minutes', 'PID5', 'T444AA'),
('C4', 'Video Call', '2024-05-01', '10:00', '1 Hour', 'PID2', 'T222AA'),
('C5', 'Phone Call', '2024-02-10', '11:00', '30 minutes', 'PID4', 'T333AA');

-- --------------------------------------------------------

--
-- Table structure for table `Journal`
--

CREATE TABLE `Journal` (
  `LogID` varchar(30) NOT NULL,
  `Com_Type` varchar(15) DEFAULT NULL,
  `LogDate` date NOT NULL,
  `LogTime` varchar(10) NOT NULL,
  `Log_Content` varchar(2000) DEFAULT NULL,
  `Therapist_Reg_No` varchar(15) NOT NULL,
  `PatientID` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Journal`
--

INSERT INTO `Journal` (`LogID`, `Com_Type`, `LogDate`, `LogTime`, `Log_Content`, `Therapist_Reg_No`, `PatientID`) VALUES
('L1', 'Phone Call', '2023-01-01', '08:00', 'The appointment was a success, I feel a lot better about how I am perceived socially, I am looking forward to book more sessions', 'T111AA', 'PID1'),
('L2', 'Video Call', '2023-02-01', '09:00', 'I would really like to spend more time with family and friends, it was good to be able to see Thomas through the video call as I could tell he was genuinely interested in what I had to say', 'T333AA', 'PID2'),
('L3', 'Phone Call', '2023-03-01', '10:00', 'That was a great appointment, I am looking forward to the next one, I might try to use the video call next time', 'T222AA', 'PID3'),
('L4', 'Phone call', '2023-04-01', '11:00', 'I still feel a bit down about the marriage situation, I will book another appointment but I might try the text message service next time', 'T111AA', 'PID4'),
('L5', 'Text Messaging', '2023-05-01', '12:00', 'This has helped me a lot. Thank you Jane for the words of encouragement', 'T222AA', 'PID5');

-- --------------------------------------------------------

--
-- Table structure for table `Patients`
--

CREATE TABLE `Patients` (
  `PatientID` varchar(15) NOT NULL,
  `PtName` varchar(30) NOT NULL,
  `PtDOB` date DEFAULT NULL,
  `PtPhoneNo` varchar(20) NOT NULL,
  `PtEmail` varchar(30) NOT NULL,
  `Therapist_Reg_No` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Patients`
--

INSERT INTO `Patients` (`PatientID`, `PtName`, `PtDOB`, `PtPhoneNo`, `PtEmail`, `Therapist_Reg_No`) VALUES
('PID1', 'Aaron Archer', '1950-01-01', '07951111111', 'aaronarcher@sql.com', 'T111AA'),
('PID2', 'Ben Booth', '1995-05-01', '07952222222', 'b.booth@sql.com', 'T222AA'),
('PID3', 'Charlie Charles', '1982-03-04', '07953333333', 'charliec@sql.com', 'T333AA'),
('PID4', 'Demi Darnel', '1988-01-10', '07954444444', 'demidarnel@sql.com', 'T333AA'),
('PID5', 'Eleanor Eva', '1972-01-03', '07955555555', 'eeva@sql.com', 'T444AA');

-- --------------------------------------------------------

--
-- Table structure for table `Payment`
--

CREATE TABLE `Payment` (
  `PaymentID` varchar(15) NOT NULL,
  `PaymentMethod` varchar(25) NOT NULL,
  `PaymentStatus` varchar(25) NOT NULL,
  `PaymentDate` date NOT NULL,
  `PaymentTime` varchar(10) DEFAULT NULL,
  `PatientID` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Payment`
--

INSERT INTO `Payment` (`PaymentID`, `PaymentMethod`, `PaymentStatus`, `PaymentDate`, `PaymentTime`, `PatientID`) VALUES
('Pay1', 'Card', 'Complete', '2023-10-01', '08:30', 'PID1'),
('Pay18', 'Card', 'Complete', '2023-11-11', '12:43', 'PID1'),
('Pay20', 'Cash', 'Complete', '2023-11-15', '09:23', 'PID4'),
('Pay32', 'Cash', 'Complete', '2023-12-20', '13:30', 'PID3'),
('Pay6', 'Card', 'Complete', '2023-12-15', '14:35', 'PID2');

-- --------------------------------------------------------

--
-- Table structure for table `Therapist`
--

CREATE TABLE `Therapist` (
  `Therapist_Reg_No` varchar(15) NOT NULL,
  `TherapistPhoneNo` varchar(20) NOT NULL,
  `TherapistName` varchar(20) NOT NULL,
  `Experience` varchar(200) NOT NULL,
  `Speciality` varchar(200) NOT NULL,
  `Approach` varchar(200) NOT NULL,
  `Availability` varchar(500) NOT NULL,
  `Notes` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Therapist`
--

INSERT INTO `Therapist` (`Therapist_Reg_No`, `TherapistPhoneNo`, `TherapistName`, `Experience`, `Speciality`, `Approach`, `Availability`, `Notes`) VALUES
('T111AA', '071111111111', 'Johnny Depp', '20 Years', 'Marriage & Depression', 'Phone Calls and Text messaging', 'I am available Monday – Friday 9am-5pm', NULL),
('T222AA', '07222222222', 'Jane Carter', '15 Years', 'Depression & Anxiety', 'Phone Calls and Text Messaging', 'I am available Monday – Sunday 8am-8pm', NULL),
('T333AA', '07333333333', 'Thomas Appleby', '5 Years', 'Suicide', 'Phone Calls and Video Calls', 'I am available on Saturday and Sunday from 9am-5pm', NULL),
('T444AA', '07444444444', 'Phoebe Prize', '3 Years', 'Marriage, Depression & Suicide', 'Phone Calls and Video Calls', 'I am available Monday – Friday 9-5pm', NULL),
('T555AA', '07555555555', 'Susan Porter', '10 Years', 'Marriage, Anxiety, Depression and Suicide', 'Phone Calls, Video Calls and Text Messaging', 'I am available Monday – Saturday 9-5pm and Sunday 8am – 2pm', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Consultations`
--
ALTER TABLE `Consultations`
  ADD PRIMARY KEY (`ConsultationID`),
  ADD KEY `FK_Consult_Therapist` (`Therapist_Reg_No`),
  ADD KEY `FK_Consult_Pt` (`PatientID`);

--
-- Indexes for table `Journal`
--
ALTER TABLE `Journal`
  ADD PRIMARY KEY (`LogID`),
  ADD KEY `FK_Pt` (`PatientID`),
  ADD KEY `FK_Therapist` (`Therapist_Reg_No`);

--
-- Indexes for table `Patients`
--
ALTER TABLE `Patients`
  ADD PRIMARY KEY (`PatientID`),
  ADD KEY `FK_Pt_Therapist` (`Therapist_Reg_No`);

--
-- Indexes for table `Payment`
--
ALTER TABLE `Payment`
  ADD PRIMARY KEY (`PaymentID`),
  ADD KEY `FK_Pay_Pt` (`PatientID`);

--
-- Indexes for table `Therapist`
--
ALTER TABLE `Therapist`
  ADD PRIMARY KEY (`Therapist_Reg_No`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Consultations`
--
ALTER TABLE `Consultations`
  ADD CONSTRAINT `FK_Consult_Pt` FOREIGN KEY (`PatientID`) REFERENCES `Patients` (`PatientID`),
  ADD CONSTRAINT `FK_Consult_Therapist` FOREIGN KEY (`Therapist_Reg_No`) REFERENCES `Therapist` (`Therapist_Reg_No`);

--
-- Constraints for table `Journal`
--
ALTER TABLE `Journal`
  ADD CONSTRAINT `FK_Pt` FOREIGN KEY (`PatientID`) REFERENCES `Patients` (`PatientID`),
  ADD CONSTRAINT `FK_Therapist` FOREIGN KEY (`Therapist_Reg_No`) REFERENCES `Therapist` (`Therapist_Reg_No`);

--
-- Constraints for table `Patients`
--
ALTER TABLE `Patients`
  ADD CONSTRAINT `FK_Pt_Therapist` FOREIGN KEY (`Therapist_Reg_No`) REFERENCES `Therapist` (`Therapist_Reg_No`);

--
-- Constraints for table `Payment`
--
ALTER TABLE `Payment`
  ADD CONSTRAINT `FK_Pay_Pt` FOREIGN KEY (`PatientID`) REFERENCES `Patients` (`PatientID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
