import axios from 'axios';

//Add Deadline
export const addDeadline=(deadline)=>({
        type:'ADD_DEADLINE',
        deadline
});

export const startAddDeadline = (deadlineData={})=>{
    return (dispatch)=>{
        const{
            year="",
            fallStart="",
            fallEnd="",
            springStart="",
            springEnd=""
        }= deadlineData;
        
        const deadline = {year,fallStart,fallEnd,springEnd,springStart};
        return axios({
           url: `http://104.196.55.103:443/product/deadlines/setDeadlines.php?year=${year}&springStart=${springStart}&springEnd=${springEnd}`,
           method:'POST',
           headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'}
        })
        .then((response)=>{
            dispatch(addDeadline({
                id:response.id,
                ...deadline
            }));
        })
        .catch((response)=>{
            console.log("Failed to add deadline");
        });
    }
};


//Remove deadline
export const removeDeadline = (
    {id}={})=>({
        type:'REMOVE_DEADLINE',
        id
    });

export const startRemoveDeadline =({id}={})=>{
    return(dispatch)=>{
        return axios({
            url: `http://104.196.55.103:443/product/deadlines/deleteDeadline.php?id=${id}`,
            method:'POST',
            headers:{
             'Accept': 'application/json',
             'Content-Type': 'application/json'}
         })
         .then((response)=>{
             dispatch(removeDeadline({id}));
             console.log("Deadline removed");
         })
         .catch((response)=>{
             console.log("Failed to remove deadline");
         });
    };
};

//Edit Deadline
export const editDeadline = (id,updates)=>({
    type:'EDIT_DEADLINE',
    id,
    updates
});

export const startEditDeadline = (id,updates)=>{
    return(dispatch)=>{
        const{
            id=0,
            year="",
            fallStart="",
            fallEnd="",
            springStart="",
            springEnd=""
        }= updates;
        
        const update = {id,year,fallStart,fallEnd,springEnd,springStart};
        return axios({
            url: `http://104.196.55.103:443/product/deadlines/updateDeadline.php?year=${year}&fallStart=${fallStart}&fallEnd=${fallEnd}&springStart=${springStart}&springEnd=${springEnd}`,
            method:'POST',
            headers:{
             'Accept': 'application/json',
             'Content-Type': 'application/json'}
         })
         .then((response)=>{
             console.log("Deadline updated");
             dispatch(editDeadline(id,updates));
             console.log("Redux store updated");
         })
         .catch((response)=>{
             console.log("Failed to update deadline");
         });
    };
};

export const setDeadline = (deadline)=>({
    type:'SET_DEADLINE',
    deadline
})

export const startSetDeadline = ()=>{
    return(dispatch,getState)=>{
        return axios.get("http://104.196.55.103:443/product/deadlines/getDeadlines.php")
            .then((response)=>{
                const deadline = response.data.data;
                //console.log(deadline);
                const deadlineArray =[];
                deadline.forEach((deadlineData)=>{
                    
                    deadlineArray.push({
                        //id:deadlineData.id,
                        year:deadlineData.year,
                        fallStart:deadlineData.fallStart,
                        fallEnd:deadlineData.fallEnd,
                        springStart:deadlineData.springStart,
                        springEnd: deadlineData.springEnd
                    });

                });
                dispatch(setDeadline(deadlineArray));
            });
    };
};