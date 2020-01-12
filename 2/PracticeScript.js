function getDataUrl(){
	const APIkey = "CWB-4548ED6A-3CA8-4ACF-B15E-385DCEC10A75";
	return "https://opendata.cwb.gov.tw/api/v1/rest/datastore/E-A0016-001?Authorization="+APIkey+"&format=JSON&areaName=%E9%AB%98%E9%9B%84%E5%B8%82";
}

class EarthquakeInfo{
	constructor(earthquakeNo,
				reportContent,
				reportImageURI,
				originTime,
				depth,
				epiCenter,
				magnitude,
				detailsURL){
		this.earthquakeNo = earthquakeNo;
		this.reportContent = reportContent;
		this.reportImageURI = reportImageURI;
		this.originTime = originTime;
		this.depth = depth;
		this.epiCenter = epiCenter;
		this.magnitude = magnitude;
		this.detailsURL = detailsURL;
	}

	toHTMLTableRowString() {
		return "<tr>"
		        +"<th scope='row'>" + this.earthquakeNo + "</th>"
				+"<td>"+ this.reportContent +"</td>"
				+"<td><img src="+ this.reportImageURI+" alt = "+ this.reportImageURI+" width='250px' height='240px'></td>"
			    +"<td>"+ this.originTime +"</td>"
				+"<td>"+ this.depth +"</td>"
				+"<td>"+ this.epiCenter +"</td>"
                +"<td>"+ this.magnitude +"</td>"
				+"<td>"+ this.detailsURL +"</td>"
		 		+ "</tr>";
	}

}

function sortOutInfo(earthquakeDataJson){
	let inFoArray = [];
	earthquakeDataJson["earthquake"].forEach(earthquakeData => {
		inFoArray.push(
			new  EarthquakeInfo(
			earthquakeData["earthquakeNo"],
			earthquakeData["reportContent"],
			earthquakeData["reportImageURI"],
			earthquakeData["earthquakeInfo"]["originTime"],
			earthquakeData["earthquakeInfo"]["depth"]["value"],
			earthquakeData["earthquakeInfo"]["epiCenter"]["location"],
			earthquakeData["earthquakeInfo"]["magnitude"]["magnitudeValue"],
			earthquakeData["web"],
			)		
		);
	});	
	return inFoArray;
}

function view(infoArr){
	//table
	let outPut = "<table><thead><tr><th scope='col'>地震編號</th>"//class='table table-striped table-hover'
				+"<th scope='col'>簡要報告</th>"
				+"<th scope='col'>報告圖檔</th>"
				+"<th scope='col'>發生時間</th>"
				+"<th scope='col'>深度(km)</th>"
				+"<th scope='col'>震央</th>"
                +"<th scope='col'>規模(芮氏)</th>"
				+"<th scope='col'>詳細資訊</th></tr></thead><tbody>";		
	infoArr.forEach(earthquakeInfo => {
		outPut+=earthquakeInfo.toHTMLTableRowString();
	});
	outPut += "</tbody></table>";

	$("#render_data").html(outPut);
}

function getWeatherData() {
	let jqxhr = $.getJSON(getDataUrl(), ()=> {
		console.log( "success" );
	})
	.done(data => {
		console.log( "second success" );
		console.log(JSON.stringify(data["records"]));
		const infoArr = sortOutInfo(data["records"]);		
		view(infoArr);		
	})
	.fail(exception => {
		console.log(exception);		
	})
	.always(() => {
		console.log( "complete" );
	});
}

$(document).ready(()=> {	
  $("#start_button").click(()=> {
	  getWeatherData();
  });
});