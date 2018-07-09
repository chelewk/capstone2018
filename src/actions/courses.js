import axios from 'axios';

//Add Course
export const addCourse=(course)=>({
        type:'ADD_COURSE',
        course
});

export const startAddCourse = (courseData={})=>{
    return (dispatch)=>{
        const{
            crn=0,
            courseName='',
            semester='',
            year=0
        }= courseData;
        
        const course = {crn,courseName,semester,year};
        return axios({
           url: `http://104.196.55.103:443/product/courses/createCourse.php?course=${number}&courseName=${name}&instructor=${instructor}&semester=${semester}&year=${year}`,
           method:'POST',
           headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'}
        })
        .then((response)=>{
            dispatch(addCourse({
                id:response.id,
                ...course
            }));
        })
        .catch((response)=>{
            console.log("Failed to add course");
        });
    }
};


//Remove Course
export const removeCourse = (
    {id}={})=>({
        type:'REMOVE_COURSE',
        id
    });

export const startRemoveCourse =({id}={})=>{
    return(dispatch)=>{
        return axios({
            url: `http://104.196.55.103:443/product/courses/deleteCourse.php?id=${id}`,
            method:'POST',
            headers:{
             'Accept': 'application/json',
             'Content-Type': 'application/json'}
         })
         .then((response)=>{
             dispatch(removeCourse({id}));
         })
         .catch((response)=>{
             console.log("Failed to remove course");
         });
    };
};

//Edit Course
export const editCourse = (id,updates)=>({
    type:'EDIT_COURSE',
    id,
    updates
});

export const startEditCourse = (id,updates)=>{
    return(dispatch)=>{
        const{
            id=0,
            crn=0,
            courseName='',
            semester='',
            year=0
        }= updates;
        
        const update = {id,crn,courseName,semester,year};
        return axios({
            url: `http://104.196.55.103:443/product/courses/updateCourse.php?id=${id}&newCourseName=${name}&newCourse=${number}&newInstructor=${instructor}&newSemester=${semester}&newYear=${year}`,
            method:'POST',
            headers:{
             'Accept': 'application/json',
             'Content-Type': 'application/json'}
         })
         .then((response)=>{
             console.log("Course updated");
             dispatch(editCourse(id,updates));
             console.log(updates);
         })
         .catch((response)=>{
             console.log("Failed to update course");
         });
    };
};

export const setCourse = (course)=>({
    type:'SET_COURSE',
    course
})

export const startSetCourse = (userID,role)=>{
    return(dispatch,getState)=>{
        return axios.get(`http://104.196.55.103:443/product/courses/getCourses.php?userID=${userID}&role=${role}`)
            .then((response)=>{
                const course = response.data.data;
                const courseArray =[];
                course.forEach((courseData)=>{
                    courseArray.push({
                        id:courseData.id,
                        crn:courseData.crn,
                        courseName:courseData.courseName,
                        semester:courseData.semester,
                        year: courseData.year,
                        instructor: courseData.insFirstName +" "+ courseData.insLastName
                    });
                });
                dispatch(setCourse(courseArray));
            });
    };
};

