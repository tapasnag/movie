const express=require("express");
const path=require("path");
const sqlite3=require("sqlite3");
{ open}=require("sqlite");
const app=express();
let database=null;
const dbPath=path.join(__dirname,"moviesData.db");
app.use(express.json());




const initializeDbAndServer=async()=>{
    try{
        database=await open({ fileName:dbPath,driver:aqlite3.Database });
        app.lisen(3000,()=>{
            console.log("Server is running on http://localhost:3000");
        });
    }catch(error){
        console.log(`Database error is {error}`);
        process.exit(1);
    }

};
initializeDbAndServer();


const convertMovieDbAPI1=(objectItem)=>{
    return {
        movieName:objectItem.movie_name,
    };
};





app.get("/movies/",async(request,response)=>{
    const getMovieListQuery=`select movie_name from movie;`;
    const getMovieListQueryResponse=await database.all(getMovieListQuery);
    response.send(
        getMovieListQueryResponse.map((eachMovie)=>convertMovieDbAPI1(eachMovie))
    );
});


app.post("/movies/", async(request,response)=>{
    const {directorId,movieName,leadActor}=request.body;
    const createMovieQuery=`insert into movie(director_id,movie_name,lead_actor values(${directorId},`{movieName}`,`${leadActor}`);`);
    const createMovieQueryResponse= await database.run(createMovieQuery);
    response.send("Movie Successfully Added");
});




const convertMovieDbAPI3=(objectItem)=>{
    return {
        movieId: objectItem.movie_id,
        directorId:objectItem.director_id,
        movieName:objectItem.movie_name,
        leadActor:objectItem.lead_actor,
        
    };
};


app.get("/movies/:moviesId",async(request,response)=>{
    const { movieId }=request.params;
    const getMovieDetailsQuery=`select * from movie where movie_id=${movieId};`;
    const getMovieDetailsQueryResponse=await database.all(getMovieDetailsQuery);
    response.send(
        convertMovieDbAPI3(getMovieDetailsQueryResponse)
    );
});



app











