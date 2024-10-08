import {useRef, useEffect} from "react";

export const CV = ({ data }) => {
    const wrapperRef = useRef(null);
    const innerRef = useRef(null);

    const formatDate = (dateString) => {
        if (!dateString) return 'Present';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
        });
    };

    const adjustFontSizeToFit = () => {
        const maxHeight = window.innerHeight; // Full viewport height
        const maxWidth = window.innerWidth; // Full viewport height
        const wrapperElement = wrapperRef.current;
        const innerElement = innerRef.current;
        let currentFontSize = 12; // Default starting font size (px)

        // Get the wrapper element
        if (maxWidth > 768) {
            currentFontSize = 16; // Default starting font size (px)

            // Set initial font size to the CSS variable
            wrapperElement.style.setProperty('--base-font-size', `${currentFontSize}px`);

            // Continuously decrease font size until the content fits
            while (innerElement.scrollHeight > maxHeight && currentFontSize > 12) {
                currentFontSize -= 1;
                wrapperElement.style.setProperty('--base-font-size', `${currentFontSize}px`);
            }
        }
        wrapperElement.style.setProperty('--base-font-size', `${currentFontSize}px`);
    };

    useEffect(() => {
        adjustFontSizeToFit(); // Adjust font size on load

        const handleResize = () => {
            adjustFontSizeToFit(); // Re-adjust on window resize
        };

        window.addEventListener('resize', handleResize); // Adjust on window resize

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup listener on unmount
        };
    }, []);

    const isSomeContactInfoFilled = data.contactInformation.email || data.contactInformation.phone

    return (
        <div className="cv-wrapper" ref={wrapperRef}>
            <div className="cv-inner" ref={innerRef}>
                <div className="personal-info top-divider">
                    {isSomeContactInfoFilled && (
                        <div className='contact-information'>
                            <p className='contact-information-item'>{data.contactInformation.address}</p>
                            <a className='contact-information-item' href={`mailto:${data.contactInformation.email}`}>{data.contactInformation.email}</a>
                            <a className='contact-information-item' href={`tel:${data.contactInformation.phone}`}>{data.contactInformation.phone}</a>
                        </div>
                    )}
                    <h1 className='full-name'>{data.personalDetails.fullName}</h1>
                    <p className='job-title'>{data.personalDetails.jobTitle}</p>
                </div>
                <div className='professional-summary-wrapper'>
                    <h2 className='section-title bottom-divider'>
                        Professional summary
                    </h2>
                    <p className="professional-summary plain-text">
                        {data.professionalSummary}
                    </p>
                </div>
                <div className='employment-history-wrapper'>
                    <h2 className='section-title bottom-divider'>
                        Employment history
                    </h2>
                    {data.employmentHistory.map((employment, index) => (
                        <div key={index} className="employment-history">
                            <div className="employment-history-head">
                                <div className="job-details">
                                    <p className='employment-job-title'>{employment.jobTitle}
                                    </p>
                                    <p className='job-company'>{employment.company}
                                    </p>
                                </div>
                                <div className='duration-location'>
                                    <div className='job-duration'>
                                        <p className='job-date'>{formatDate(employment.startDate)}
                                        </p>
                                        -
                                        <p className='job-date'>{formatDate(employment.endDate)}
                                        </p>
                                    </div>
                                    <p className='location'>
                                        {employment.location}
                                    </p>
                                </div>
                            </div>
                            <ul>
                                {employment.responsibilities.map((responsibility, index) => (
                                    <li key={index} className='responsibilities plain-text'>
                                        {responsibility}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className='skills-wrapper'>
                    <h2 className='section-title bottom-divider'>
                        Skills
                    </h2>
                    <div className='skills'>
                        {data.skills.join(', ')}
                    </div>
                </div>
                <div className='education-wrapper'>
                    <h2 className='section-title bottom-divider'>
                        Education
                    </h2>
                    {data.education.map((educationItem, index) => (
                        <div key={index} className="education">
                            <div className='education-item'>
                                <div className="degree-institution">
                                    <p className='degree'>{educationItem.degree}</p>
                                    <p className='institution'>{educationItem.institution}</p>
                                </div>
                                <div className='duration-location'>
                                <div className='degree-duration-wrapper'>
                                        <span className='degree-duration'>{formatDate(educationItem.startDate)}
                                        </span>
                                        -
                                        <span className='degree-duration'>{formatDate(educationItem.endDate)}
                                        </span>
                                    </div>
                                    <p className='location'>
                                        {educationItem.location}
                                    </p>
                                </div>
                            </div>
                            <div className='education-item'>
                                <p className='education-description plain-text'>{educationItem.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='courses-wrapper'>
                    <h2 className='section-title bottom-divider'>
                        Courses
                    </h2>
                    <div className="courses">
                        {data.courses.map((course, index) => (
                            <div key={index} className='education-item'>
                                <div className="degree-institution">
                                    <p className='degree'>{course.courseName}</p>
                                    <p className='institution'>{course.institution}</p>
                                </div>
                                <div className='duration-location'>
                                    <div className='degree-duration-wrapper'>
                                        <span className='degree-duration'>{formatDate(course.startDate)}
                                        </span>
                                        -
                                        <span className='degree-duration'>{formatDate(course.endDate)}
                                        </span>
                                    </div>
                                    <p className='location'>
                                        {course.location}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='hobbies-wrapper'>
                    <h2 className='section-title bottom-divider'>
                        Hobbies
                    </h2>
                    <div className="hobbies-inner">
                        {data.hobbies.map((hobbie, index) => (
                            <span key={index}>{hobbie}.</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}