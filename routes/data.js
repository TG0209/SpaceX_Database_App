// including essential libraries
const express = require("express"),
 	  router  = express.Router(),
	  request = require('request'),
	  URL = "https://api.spacexdata.com/v3/launches?limit=100";


// intial route

router.get("/",function(req,res){
	res.redirect("/data");
});

// route to apply filters

router.post("/data/new",function(req,res){
	
	let obj = req.body;  // extracting request as javascript object
	let year = "";
	let launch = false;  // variables to store filter results
	let land = false;
	
	if(("year" in obj)){  // if year filter is applied
		year = obj.year;	
	}
	if(("launch" in obj)){  // if launch success filter is applied
		launch = true;
	}
	if(("land" in obj)){   // if land success filter is applied
		land = true;
	}
	
	let url;  // to store respond url for given choices of filter
	let flagYear = false; //to store if year filter is applied
	
	 // no filter case
	
	if(year==="" && launch===false && land===false){
		url = "https://api.spacexdata.com/v3/launches?limit=100";
	}
	 // if year filter not applied
	else if(year===""){  
		// if both filters is applies
		if(launch===true && land===true){
			url = "https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true"; 
		}
		// if launch filter is applied
		else if(launch===true){
			url = "https://api.spacexdata.com/v3/launches?limit=100&launch_success=true";
		}
		// if land filter is applied
		else{
			url = "https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true";
		}
	}
	// if year filter is applied
	else{
		// both filter applied
		if(launch===true && land===true){
			url = "https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=2014";
		}
		// launch filter applied
		else if(launch===true){
			url = "https://api.spacexdata.com/v3/launches?limit=100&launch_success=true";
			flagYear = true;
		}
		// land filter applied
		else{
			console.log("hi");
			url = "https://api.spacexdata.com/v3/launches?limit=100";
			flagYear = true;
			
		}
	}
	
	// to render the response based on filters applied
	request(url, function (error, response, body){
		if(error){
			console.log(error);
		}
		else{
			data = JSON.parse(body);
			if(flagYear===true){
				data = data.filter(x=> x.launch_year===year);
			}
			res.render("home",{Data:data});	
		}
	});
	
});


router.get("/data",function(req,res){
	
	// to load intial data without filters
	request(URL, function (error, response, body){
		if(error){
			console.log(error);
		}
		else{
			data = JSON.parse(body);
			res.render("home",{Data:data});	
		}
	});
	
});

// export routes

module.exports = router;
