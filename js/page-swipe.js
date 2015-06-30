var isInitialLoad = true;
var pageTransition= "slidefade";

// but we only need to bind once so we use "one()"
$( document ).one( "pagecreate", ".contentContainer", function() {
	$("#menu #dialog ul li a").on("vclick", function(event, element){
		event.preventDefault();
		var nav = $(this).attr("href");
		navnext(nav);
	});

	// Initialize the external persistent header and footer
	$( "#header" ).toolbar();
	$("#footerContent").toolbar();
	$( "#footer" ).toolbar();
	// Handler for navigating to the next page
	function navnext( next ) {
		/* $( ":mobile-pagecontainer" ).pagecontainer( "change", next + ".html", {
			transition: "slide"
		}); */
		next += ".html";
		$.mobile.changePage(next, {transition: pageTransition});
		closeMenu();
	}

	// Handler for navigating to the previous page
	function navprev( prev ) {
		/* $( ":mobile-pagecontainer" ).pagecontainer( "change", prev + ".html", {
			transition: "slide",
			reverse: true
		}); */
		prev += ".html";
		$.mobile.changePage(prev, {transition:pageTransition, reverse:true});
		closeMenu();
	}

	// Navigate to the next page on swipeleft
	$( document ).on( "swipeleft", ".ui-page", function(){
		var next = $( this ).jqmData( "next" );
		if( next && ($(event.target).closest(".contentContainer").is($( this )[ 0 ] ))){
			navnext( next );
		}
	});

	$( document ).on( "vclick", ".next", function() {
		var next = $( ".ui-page-active" ).jqmData( "next" );

		// Check if there is a next page
		if ( next ) {
			navnext( next );
		}
	});

	// The same for the navigating to the previous page
	$( document ).on( "swiperight", ".ui-page", function swipeRight( event ) {
		var prev = $( this ).jqmData( "prev" );

		/* if ( prev && ( event.target === $( this )[ 0 ] ) ) { */
		if( prev && ($(event.target).closest(".contentContainer").is($( this )[ 0 ] ))){
			navprev( prev );
		}
	});
	
	$( document ).on( "vclick", ".prev", function() {
		var prev = $( ".ui-page-active" ).jqmData( "prev" );

		if ( prev ) {
			navprev( prev );
		}
	});
});

$(document).on("pagebeforeshow", ".contentContainer", function(){
	loadPageContent($($(this)[0]));
});

$( document ).on( "pageshow", ".contentContainer", function() {
	var thePage = $( this ),
		title = thePage.jqmData( "title" ),
		next = thePage.jqmData( "next" ),
		prev = thePage.jqmData( "prev" );

	document.title = title;
	
	$( ".next.hidden, .prev.hidden" ).removeClass( "hidden" );
	removeOverlay();
	
	if ( ! next ) {
		$( ".next" ).addClass( "hidden" );
	}
	if ( ! prev ) {
		$( ".prev" ).addClass( "hidden" );
	}
});

