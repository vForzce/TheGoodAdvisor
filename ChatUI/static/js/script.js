// Global Variables representing the data to be sent to Flask
let completed_courses = []  // default, no courses have been completed
let find_prerequisites = [] // default, no prerequisites to be found
// Default, False values for other params
let create_four_year_plan = false
let isDataScience = false
let isCYBER = false
let isSWE = false
document.getElementById("submitButton").addEventListener("click", function() {
	// Upon Submission these are the values collected from the buttons

    var selectedStudentType = document.querySelector('input[name="student-type"]:checked');
	
	var studentPlan4Year = document.querySelector('input[name="student-optionPlan4Year"]:checked');
	
    var inputMessageField = document.getElementById("inputMessageField");
    var outputMessageField = document.getElementById("outputMessageField");
    var rightTabHeading = document.querySelector('.right-tab h2');
    var incomingFreshmanOptions = document.getElementById("incoming-freshman-options");
	
	var fresherSelectYourPlan = document.getElementById("freshplan-select-your-plan");
	
    var existingCreditsOptions = document.getElementById("existing-credits-options");
    var existingOptions = document.getElementById("existing-credits-container");
    var fourYearPlanOption = document.querySelector('input[name="student-option"][value="four-year-plan"]');
    var softwareEngineeringCourseworkOption = document.querySelector('input[name="student-option"][value="software-engineering1"]');
    var preReqForCourseOption = document.querySelector('input[name="student-option"][value="prerequisites1"]');
    var dataScienceCertificateOption = document.querySelector('input[name="student-option"][value="data-science-certificate"]');
    var cyberSecurityCertificateOption = document.querySelector('input[name="student-option"][value="cybersecurity-certificate"]');
    var existingDataScienceCertificateOption = document.querySelector('input[name="existing-option"][value="datascience-cert"]');
    var existingCyberSecurityCertificateOption = document.querySelector('input[name="existing-option"][value="cyber-security-cert"]');
	var existingNoneOption = document.querySelector('input[name="existing-option"][value="none"]');
    outputMessageField.textContent = ""; // Clear existing output message
    outputMessageField.style.display = "block";
    

     // save the values to be used in the sendPythonFunction

    
    // Completed Courses

        var taken_courses = document.querySelectorAll('input[name="course-taken"]:checked');
        
        // Loop through the checked checkboxes and push their values to the array
        taken_courses.forEach(function (checkbox) {
            completed_courses.push(checkbox.value);
        });
        console.log("Completed Courses: ",completed_courses)
        
    
        var studentOptionRadios = document.querySelectorAll('input[name="student-option"]');
        var clickedStudentOption;
        studentOptionRadios.forEach(function(radioButton) {
            if (radioButton.checked) {
                clickedStudentOption = radioButton.value;
            }
        });
        console.log(clickedStudentOption)
        if (clickedStudentOption == 'four-year-plan') {
            create_four_year_plan = true
            console.log(create_four_year_plan)
        } else if (clickedStudentOption == 'prerequisites1') {
            // collect the prerequisites selected
            var find_prereq_courses = document.querySelectorAll('input[name="find-prereqs"]:checked');
    
        // Loop through the checked checkboxes and push their values to the array
        find_prereq_courses.forEach(function (checkbox) {
            find_prerequisites.push(checkbox.value);
        });
        console.log("Find The Prerequisites for: ",find_prerequisites)


        }else if (clickedStudentOption == 'software-engineering1') {
            // complete this addditional functionality later
            isSWE = true
        }

        var studentCertificateOptions = document.querySelectorAll('input[name="student-optionPlan4Year"]');
        var clickedStudentCertificate;
        studentCertificateOptions.forEach(function(radioButton) {
            if (radioButton.checked) {
                clickedStudentCertificate = radioButton.value;
            }
        });

        if (clickedStudentCertificate== 'data-science-certificate') {
            isDataScience = true
            console.log('Data Science Certificate was selected')
        } else if (clickedStudentCertificate == 'cybersecurity-certificate') {
            isCYBER = true
            console.log('CyberSecurity Certificate was selected')
        } else {
            // no certificate was selected
        }

        /*
        I have set each of these values before anything gets printed so now i can
        call the function within the final output chat section
        */ 


    if (selectedStudentType) {
        var selectedValue = selectedStudentType.value;
        // completed_courses stays empty 
        if (selectedValue === "incoming-freshman") {
            if(selectedValue==="incoming-freshman") {
                inputMessageField.value = "Incoming Freshman";
                outputMessageField.textContent = "Welcome to Georgia State University! We are excited to have you join our incoming freshman class.";
                rightTabHeading.textContent = "How May I Assist You?";
                var studentTypeContainer = document.querySelector('.radio-group');
                studentTypeContainer.innerHTML = '';


                incomingFreshmanOptions.style.display = "block";
                existingCreditsOptions.style.display = "none";

                var sendButton1 = document.getElementById('submitButton');
                sendButton1.addEventListener('click', function (){
                    if (fourYearPlanOption && fourYearPlanOption.checked) {
						inputMessageField.value = "Incoming Freshman";
						outputMessageField.textContent = "Welcome to Georgia State University! We are excited to have you join our incoming freshman class.";
						rightTabHeading.textContent = "Select your plan";
						
						//alert(fourYearPlanOption.value);
						incomingFreshmanOptions.style.display = "none";
						existingCreditsOptions.style.display = "none";
						fresherSelectYourPlan.style.display = "block";
						//alert("inner");
						
						
						var sendButton1 = document.getElementById('submitButton');
						sendButton1.addEventListener('click', function (){
							
								var valuePlan =  document.querySelector('input[name=student-optionPlan4Year]:checked').value;
								if(valuePlan === "data-science-certificate"){
								    callPythonFunction(completed_courses, find_prerequisites, create_four_year_plan, isDataScience, isCYBER, isSWE);
								}
								else if(valuePlan === "cybersecurity-certificate"){
									callPythonFunction(completed_courses, find_prerequisites, create_four_year_plan, isDataScience, isCYBER, isSWE);
								}
								else if(valuePlan === "none"){
                                    callPythonFunction(completed_courses, find_prerequisites, create_four_year_plan, isDataScience, isCYBER, isSWE);
								}
							
						})   

                    }
                    else if (softwareEngineeringCourseworkOption && softwareEngineeringCourseworkOption.checked) {
                        outputMessageField.textContent = "Here is your Software Engineering Coursework. Take CSC 2720 as soon as possible.";
                        var rightTab = document.querySelector('.right-tab');
                        rightTab.style.display = "none";
                        var statusMessage = document.getElementById('statusMessageField');
                        statusMessage.textContent = '';
                    }

                    else if (preReqForCourseOption && preReqForCourseOption.checked) {
                        inputMessageField.value = "Pre-requisite for Course";
                        outputMessageField.textContent = "Select and send the course you would like a pre-requisite for on the right tab.";
                        rightTabHeading.textContent = "Select The Course";
                        incomingFreshmanOptions.style.display = "none";
                        existingCreditsOptions.style.display = "none";

                        var preReqForCourseOptionsContainer = document.getElementById("pre-req-options-container");
                        var sendButton = document.getElementById('submitButton');
                        var rightTab = document.querySelector('.right-tab');
                        rightTab.appendChild(preReqForCourseOptionsContainer); // Append pre-requisite radio buttons to the right tab
                        preReqForCourseOptionsContainer.style.display = "block";

                        sendButton.style.position = 'absolute';
                        sendButton.style.bottom = '1rem'; // Set desired bottom position
                        sendButton.style.left = '50%'; // Set left position to the center
                        sendButton.style.transform = 'translateX(-50%)';
                        sendButton.style.width = ''; // Reset width to default (if overridden)
                        sendButton.style.height = '';
                        var preReqSelected = document.querySelector('input[name="find-prereqs"]:checked');

                        if (preReqSelected) {
							
                            var selectedCourse = preReqSelected.value;
                            // Display pre-requisites for the selected course in the output message field
                            inputMessageField.value = "Pre-requisite for Course";
                            outputMessageField.textContent = `Here are the pre-requisites for ${selectedCourse}: [List your pre-requisites here]`;

                            // Hide the right tab
                            var rightTab = document.querySelector('.right-tab');
                            rightTab.style.display = "none";

                            // Clear any existing status or messages
                            var statusMessage = document.getElementById('statusMessageField');
                            statusMessage.textContent = '';
                        }
                    }

                    else if (dataScienceCertificateOption && dataScienceCertificateOption.checked) {
                        outputMessageField.textContent = "Here is your Data Science Certificate Coursework.";
                        var rightTab = document.querySelector('.right-tab');
                        rightTab.style.display = "none";
                        var statusMessage = document.getElementById('statusMessageField');
                        statusMessage.textContent = '';
                    }
                    else if (cyberSecurityCertificateOption && cyberSecurityCertificateOption.checked) {
                        outputMessageField.textContent = "Here is your CyberSecurity Certificate Coursework.";
                        var rightTab = document.querySelector('.right-tab');
                        rightTab.style.display = "none";
                        var statusMessage = document.getElementById('statusMessageField');
                        statusMessage.textContent = '';
                    }
                    else{
                        // Handle the case if no course is selected for pre-requisites
                        outputMessageField.textContent = "Please select a course for pre-requisites.";
                    }
                })



            }
        } else if (selectedValue === "existing-credits") {
            if (selectedValue === "existing-credits") {
                inputMessageField.value = "Existing Credits";
                outputMessageField.textContent = "Please select the courses you have already taken.";
                rightTabHeading.textContent = "Select Courses Taken";

               var studentTypeContainer = document.querySelector('.radio-group');
               studentTypeContainer.innerHTML = '';
                incomingFreshmanOptions.style.display = "none";
                existingCreditsOptions.style.display = "block";

                // Checkboxes logic when at least one checkbox is selected and "Send" is clicked
                var sendButton2 = document.getElementById('submitButton');
                sendButton2.addEventListener('click', function () {var checkboxes = document.querySelectorAll('input[name="course-taken"]:checked');
                    if (checkboxes.length > 0) {
                        inputMessageField.value = "Pre-requisite for Course";
                        outputMessageField.textContent = "Select an option on the right tab";
                        rightTabHeading.textContent = "Select An Option";
                        incomingFreshmanOptions.style.display = "none";
                        existingCreditsOptions.style.display = "none";

                        // Assuming there's a container for the new options
						var remainingPlan = document.getElementById("ExistingCredits2-RemainingPlan");
						
                        var existingCredits2Options = document.getElementById("ExistingCredits2-options");
                        var rightTab = document.querySelector('.right-tab');
                        rightTab.appendChild(existingCredits2Options); // Append the new options to the right tab
                        existingCredits2Options.style.display = "block";
                        var softwareEngineeringInternshipOption = document.querySelector('input[name="existing-option"][value="Software Engineering Internship"]');
                        var remainingPlanOption = document.querySelector('input[name="existing-option"][value="Remaining Plan"]');
                        var prereqoption = document.querySelector('input[name="existing-option"][value="Pre-Req For Course"]');
                        if (softwareEngineeringInternshipOption && softwareEngineeringInternshipOption.checked) {
                            outputMessageField.textContent = "Here is the track to prepare for a SWE Internship.";
                            // Additional logic if needed for the SWE Internship track
                        } else if (remainingPlanOption && remainingPlanOption.checked) {
							
							rightTabHeading.textContent = "Please select a Concentration";
							existingCredits2Options.style.display = "none";
							
							
							
							var rightTabRemain = document.querySelector('.right-tab');
							rightTabRemain.appendChild(remainingPlan);
							remainingPlan.style.display = "block";
							
                            outputMessageField.textContent = "Here are the list of courses needed in order for you to graduate.";
                            // Additional logic for the remaining plan
                        } else if (prereqoption && prereqoption.checked) {         
							//alert("error");               
							inputMessageField.value = "Pre-requisite for Course";
                            outputMessageField.textContent = "Select and send the course you would like a pre-requisite for on the right tab.";
                            rightTabHeading.textContent = "Select The Course";
                            incomingFreshmanOptions.style.display = "none";
                            existingCreditsOptions.style.display = "none";

                            var preReqForCourseOptionsContainer = document.getElementById("pre-req-options-container");
                            var sendButton = document.getElementById('submitButton');
                            var rightTab = document.querySelector('.right-tab');
                            rightTab.appendChild(preReqForCourseOptionsContainer); // Append pre-requisite radio buttons to the right tab
                            preReqForCourseOptionsContainer.style.display = "block";

                            sendButton.style.position = 'absolute';
                            sendButton.style.bottom = '1rem'; // Set desired bottom position
                            sendButton.style.left = '50%'; // Set left position to the center
                            sendButton.style.transform = 'translateX(-50%)';
                            sendButton.style.width = ''; // Reset width to default (if overridden)
                            sendButton.style.height = '';
                            var preReqSelected = document.querySelector('input[name="course-taken"]:checked');

                            if (preReqSelected) {
								
								
                                var selectedCourse = preReqSelected.value;
	
                                // Display pre-requisites for the selected course in the output message field
                                inputMessageField.value = "Pre-requisite for Course";
                                outputMessageField.textContent = `Here are the pre-requisites for ${selectedCourse}: [List your pre-requisites here]`;
								existingOptions.style.display = "none";
                                // Hide the right tab
                                var rightTab = document.querySelector('.right-tab');
                                rightTab.style.display = "block";
								
								var sendButton2 = document.getElementById('submitButton');
								sendButton2.addEventListener('click', function(){
									//alert("entered in field");
									rightTab.style.display = "none";
									outputMessageField.textContent = `Here are the pre-requisites for all the course(Here you can display your desired message)`;
								})
                                // Clear any existing status or messages
                                var statusMessage = document.getElementById('statusMessageField');
                                statusMessage.textContent = '';
                            }

                        }
                        else if (existingDataScienceCertificateOption && existingDataScienceCertificateOption.checked) {
                            outputMessageField.textContent = "Here is your Data Science Certificate Coursework.";
                            var rightTab = document.querySelector('.right-tab');
                            rightTab.style.display = "none";
                            var statusMessage = document.getElementById('statusMessageField');
                            statusMessage.textContent = '';
                        }
                        else if (existingCyberSecurityCertificateOption && existingCyberSecurityCertificateOption.checked) {
                            outputMessageField.textContent = "Here is your CyberSecurity Certificate Coursework.";
                            var rightTab = document.querySelector('.right-tab');
                            rightTab.style.display = "none";
                            var statusMessage = document.getElementById('statusMessageField');
                            statusMessage.textContent = '';
                        }
                        else if(existingNoneOption && existingNoneOption.checked){
                            // Handle the case if no checkboxes are selected
                            outputMessageField.textContent = "You did not select course";
                            var rightTab = document.querySelector('.right-tab');
                            rightTab.style.display = "none";
                            var statusMessage = document.getElementById('statusMessageField');
                            statusMessage.textContent = '';
                        }
                    }
                })
            }
        }

        // Show the input and output fields only after clicking send
        inputMessageField.style.display = "block";
        outputMessageField.style.display = "block";
    
}


function callPythonFunction(completed_courses, find_prerequisites, create_four_year_plan, isDataScience, isCYBER, isSWE) {
    // Make an AJAX request to the Flask server
    $.ajax({
        type: 'POST',
        url: '/process-request',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify({
            completed_courses: completed_courses, 
            find_prerequisites: find_prerequisites, 
            create_four_year_plan: create_four_year_plan, 
            isDataScience: isDataScience, 
            isCYBER: isCYBER, 
            isSWE: isSWE
        }),
        success: function (response) {
            // Handle the response from the server
            if ( typeof response.fourYearPlan == 'string' ) {
                console.log(response.fourYearPlan);
                var formattedText = response.fourYearPlan.replace(/\n/g, '<br>');
                outputMessageField.innerHTML = formattedText;
                
            } else {
                // If it's not a string, handle accordingly
                console.error('Invalid response format for fourYearPlan:', fourYearPlan);
                outputMessageField.textContent = 'Error: Invalid response format for fourYearPlan';
            }

        },
        error: function (error) {
            console.error(error);
            outputMessageField.textContent = "Thank you for using the Good Advisor!";
        }
});
}

});
