import React,{useCallback,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input, Select, RTE} from "../index"
import  appwriteService from "../../appwrite/configuration";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({post}) {

    const {register,handleSubmit,getValues,setValue,control,watch}=useForm({
         defaultValues:{
               title:post?.title||'',
               slug : post?.slug||'',
               content:post?.content||'',
               status:post?.status||"active",

         },
    })
     
    const navigate=useNavigate()
    console.log("useedaataa111");
    const userData=useSelector((state)=>state.auth.userData)
    
    const { userData: { $id :userIdRedux} }=userData;
    console.log("userData ID:", userIdRedux);
    console.log("useedaataa222");
    
    const submit=async(data)=>{
        if(post)
        {
            const file=data.image[0]? appwriteService.uploadFile(data.image[0]) : null

            if(file)
            {
                appwriteService.deleteFile(post.featuredImage)
            }
            const dbPost=await appwriteService.updatePost(
                post.$id,{ 
                    ...data,
                    featuredImage:file?file.$id:undefined
                }
            )

            if(dbPost)
            {
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else
        {
            const file=data.image[0]? await appwriteService.uploadFile(data.image[0]) : null
              console.log("file:", file);
            if(file)
            {
                const fileId= file.$id;
                data.featuredImage=fileId;
                console.log("fileId:", fileId);
               const dbPost= await appwriteService.createPost({
                    ...data,
                    userId:userIdRedux,
                })
                console.log("data:", data);
                console.log("dbPost:", dbPost);
                console.log("dbpostid",dbPost.$id);
                if(dbPost)
                    {
                        navigate(`/post/${dbPost.$id}`)
                    }
            }
        }

    }

    const slugTransform=useCallback((value)=>{
        if(value && typeof(value)==="string")
        {
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d]+/g, "-")
            .replace(/\s/g, "-");

        }
        else
        {
            return "";
        }
    },[]);
    
    useEffect(()=>{

        const subscription=watch((value,{name})=>{

            if(name==="title")
            {
                setValue('slug',slugTransform(value.title),{shouldValidate:true})
            }
        })

        return ()=>{
            subscription.unsubscribe();
        }
    },[watch,slugTransform,setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
      <div className='w-2/3 px-2'>
        <Input
          label="Title :"
          placeholder="title"
          className="mb-4"
          {...register("title",{required:true,})}
        />
        <Input
          label="slug:"
          placeholder="slug"
          className="mb-4"
          {...register("slug",{required:true,})}
          onInput={(e)=>{
            setValue('slug',slugTransform(e.currentTarget.value),{shouldValidate:true})
          }}
        />
        <RTE label="content:" name="content" control={control} defaultValue={getValues("content")}/>
      </div>
      <div className="w-1/3 px-2">
      <Input
        label="FeaturedImage :"
        type="file"
        className="mb-4"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        {...register("image",{required:!post,})}
      />
      {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : "bg-red-500"} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
      </div>
      
    </form>
  )
}

export default PostForm