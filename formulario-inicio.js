$("#range_02").ionRangeSlider({
    grid: true,
    min: 2000,
    max: 25000,
    from: 2500,
    prefix: "$",
    postfix: "+",
    hide_min_max: true,
    decorate_both: true,
    force_edges: true,
    step: 50
});
$("#range_date").ionRangeSlider({
    grid: true,
    min: 0,
    max: 18,
    from_min: 0.5,
    from: 1,
    prefix: "± ",
    postfix: " month(s)",
    hide_min_max: true,
    force_edges: true,
    step: 0.5
});




var Webflow = Webflow || [];
Webflow.push(function () {
	document.getElementsByClassName('date').flatpickr({
		mode: "range"
  });
});
