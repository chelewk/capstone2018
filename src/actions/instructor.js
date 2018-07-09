import axios from 'axios';

export const setInstructor=(instructor)=>({
    type:'SET_INSTRUCTOR',
    instructor
});

export const startSetInstructor=()=>{
    return(dispatch)=>{
    return axios({
        url: "http://104.196.55.103:443/product/users/getInstructor.php",
        method:'POST',
           headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'}
    })
    .then((response)=>{
        const instructor = response.data.data;
        const instructorArray =[];
        instructor.forEach(instructor=> {
            instructorArray.push({
                cwid:instructor.cwid,
                firstName:instructor.firstName,
                lastName:instructor.lastName,
                role:instructor.role,
                canSchedule:instructor.canSchedule
            });
        });
        dispatch(setInstructor(instructorArray));
    })
    .catch(()=>{
        console.log("Failed to Set Instructor");
    });
    }
};