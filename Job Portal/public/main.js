function deleteProduct(id)
{
    console.log('In js delete')
    const res=confirm("Are you sure you want to delete this job ?");
    if(res)
    {
        fetch(`/delete/${id}`).then((res)=>{
            if(res.ok)
                location.assign("/jobs")
            }).catch((err)=>{
                console.log(err)
            })
       
    }
}
