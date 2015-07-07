
var objContent = [];
var landingId = "#introduction";

function is_touch_device() {
  return 'ontouchstart' in window // works on most browsers 
      || 'onmsgesturechange' in window; // works on ie10
};

var currentPage = 1;
var pages = 0;


function processPdf(pathId, targetId){
		var obj = $(pathId);
		var pdfpath = obj.attr("href");
	
		obj.parent().delegate("#" + obj.attr("id"),"click",{path:pdfpath, target:targetId}, function(event){
			event.preventDefault();
			var path = event.data.path;
			var target = "#" + event.data.target;
			if($(target + " canvas").length == 0){
				loadPdfPopup(path,target);
			}
			displayPdf(target);
			return false;
		});
}

function loadPdfPopup(path,target){
	if(path.length > 0){
		PDFJS.getDocument(path).then(function(pdf){
			currentPage = 1;
			pages = pdf.numPages;
			
			loadedPdf = pdf;
			
			loadedPdf.getPage(currentPage).then(function(data){processPage(data,target);});
			
		}, failedPdf);
	}	
}

/* function loadPdf(pathId){
	var path = pdfpath;
	alert(path);
	if(path.length > 0){
		PDFJS.getDocument(path).then(function(pdf){
			currentPage = 1;
			pages = pdf.numPages;
			
			loadedPdf = pdf;
			
			loadedPdf.getPage(currentPage).then(processPage);
		}, failedPdf);
	}
	
	
} */

function processPage(page, target){
	var scale = 1.25;
	var viewport = page.getViewport(scale);
	
	var canvas = document.createElement("canvas");
	canvas.style.display = "block";
	var context = canvas.getContext("2d");
	canvas.height = viewport.height;
	canvas.width = viewport.width;
	
	var renderContext = {
		canvasContext: context,
		viewport: viewport
	};
	page.render(renderContext);
	$(target).append(canvas);
	
	
	currentPage++;
	if(loadedPdf !== null && currentPage <= pages)
	{
		loadedPdf.getPage(currentPage).then(function(data){processPage(data,target);});
	}
}

function displayPdf(target){
	$(target).removeClass("hidden");
	$("#background-hide.pdfViewer").toggle();
}

function closePdf(){
	$("#canvasContainer div").not(".hidden").addClass("hidden");
	$("#background-hide.pdfViewer").toggle();
}

function failedPdf(){
	alert("PDF Not Available");
}

function openPopup(popId){
	
	$ ( "#" + popId).show();
	backgroundDisplay()
}
function closePopup(popId){
	$ ("#" + popId).hide();
	backgroundDisplay()
}

/* function changeFeature(element){
	id = $(element).attr("id");
	
	
	if(id == "viewNewFeatures")
	{
		$("#viewNewFeatures").addClass("hidden");
		$("#brandFeatures").removeClass("hidden");
		$(".imgActiveFeature").removeClass("imgActiveFeature");
		$("#imgFeaturesB").addClass("imgActiveFeature");
		$("#featureTexta").removeClass("hidden");
		$("#featuresView").addClass("featuresViewOpen");
	}else if(id == "hcFeatures"){
		if(!$(element).hasClass("activeBrand"))
		{
			var img = $("#brandFeatures img");
			$("#ssFeatures").removeClass("activeBrand");
			$.each(img, function(){
				$(this).toggleClass("activeLogo");
			});
			$(element).addClass("activeBrand");
			$(".imgActiveFeature").removeClass("imgActiveFeature");
			$("#imgFeaturesB").addClass("imgActiveFeature")
			$("#featureTexta").removeClass("hidden");
			$("#featureTextb").addClass("hidden");
		}
	}else if(id == "ssFeatures"){
		if(!$(element).hasClass("activeBrand"))
		{
			var img = $("#brandFeatures img");;
			$.each(img, function(){
				$(this).toggleClass("activeLogo");
			});

			$("#hcFeatures").removeClass("activeBrand");

			$(element).addClass("activeBrand");
			$(".imgActiveFeature").removeClass("imgActiveFeature");
			$("#imgFeaturesC").addClass("imgActiveFeature");
			$("#featureTextb").removeClass("hidden");
			$("#featureTexta").addClass("hidden");
		}
	}
	
	
} */

function backgroundDisplay()
{
	$("#background-hide").not(".pdfViewer").toggle();
}

/* function navigate( next ) {
		next += ".html";
		$.mobile.changePage(next, {transition: pageTransition});
		closeMenu();
	}
function navigatePrev( prev ) {
		prev += ".html";
		$.mobile.changePage(prev, {transition:pageTransition, reverse:true});
		closeMenu();
	} */

function displayMenu(){
	$("#menu").slideDown("slow");
	$("#menuBox").hide();
}

function closeMenu(){
	$("#menu").slideUp("fast");
	$("#menuBox").show();
}
	

$(document).ready(function(){
	loadAllJSON();
	$("#opener").on("click", function(){
		displayMenu();
	});
});

/* function openCaseDetail(element){
	var thisContent = $(element).siblings(".caseContentSlider");
	if(thisContent.hasClass("hidden")){
		$(".caseContentSlider").not("hidden").addClass("hidden");
		//$(element).css(":before");
		thisContent.removeClass("hidden")
					.removeClass("fade");
		var closedHeadings = $("#caseDetailList .caseHeading");
		$.each(closedHeadings, function(){
			if($(this).siblings(".caseContentSlider").hasClass("hidden")){
				$(this).addClass("fade")
					.removeClass("active");
			}else{
				$(this).removeClass("fade")						
					.addClass("active");
			}
		});
		$(element).parent().parent().next().find(".caseHeading").removeClass("fade");
	}else{
		thisContent.addClass("hidden").removeClass("active");
	}
}

function changeWhy(element){
	id = $(element).attr("id");
	
	$(".logoIndicatorActive").removeClass("logoIndicatorActive");
	//$(element).siblings(".logoIndicator").addClass("logoIndicatorActive");
	$(".whyContentActive").removeClass("whyContentActive");
	
	
	switch(id)
	{
		case "hcLogo":
			$("#hcLogoContent").addClass("whyContentActive");
			$(".hcIndicator").addClass("logoIndicatorActive");
			break;
		case "ssLogo":
			$("#ssLogoContent").addClass("whyContentActive");
			$(".ssIndicator").addClass("logoIndicatorActive");
			break;
		case "mixedLogo":
			$("#mixedLogoContent").addClass("whyContentActive");
			$(".mixIndicator").addClass("logoIndicatorActive");
			break;
		case "baxLogo":
			$("#baxLogoContent").addClass("whyContentActive");
			$(".baxIndicator").addClass("logoIndicatorActive");
			break;
	}
	
} */

function loadAllJSON(){
		$.getJSON("../json/content.json", function(json){
			objContent = json.content;
		}).done(function(){
			loadPageContent($(landingId)); 		
		});
		
		return false;	
		
	}

function loadPageContent(element){
		var id= element.attr("id");
		var objPageContent = getPageObject(id);
		
		 if(objPageContent.length > 0)
		{
			$.each(objPageContent[0].containers,function(){
				var container = this.containerId;
				var content = this.containerContent;
				
				$(element.find("#" + container)).html(content);
			});
		} 
}

function getPageObject(pageId)
{
	return $.grep(objContent, function (item){
		return item.pageId == pageId;
	});
}

