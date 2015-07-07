
function navigate(sender){
			var contentId = "";
			var path = "";
			
			var val = $(sender).text().toLowerCase();
			
			if($(sender).prop("id") == "landingMain")
			{
				val = "introduction";
			}
			
			switch(val)
			{
				case "home":
					//location.reload(true);
					window.location.href = "index.html";
					return false;
					break;
				case "introduction":
					window.location.href = val + ".html";
					return false;
					break;
				case "stability data":
					contentId = "stability";
					break;
				case "objection handler":
					contentId = "objHandler";
					break; 
				default:
					contentId = $(sender).text().toLowerCase();										
			}
			getPageContent(contentId,path);
		}
		
		function getPageContent(id, path){
			var fullPath = path + id + ".html";
			$.get(fullPath, function(data){
				$("#mainContentOuter").empty();
				$("#mainContentOuter").html(data);
				loadPageContent($("#" + id));
			});
		}