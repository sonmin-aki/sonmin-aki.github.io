function check_evidence() {
	// Read all evidences
	var dots = $("#check-dots").prop("checked");
	var emf = $("#check-emf").prop("checked");
	var fingerprint = $("#check-fingerprint").prop("checked");
	var freeze = $("#check-freeze").prop("checked");
	var orbs = $("#check-orbs").prop("checked");
	var writing = $("#check-writing").prop("checked");
	var spirit = $("#check-spirit").prop("checked");
	// Read game mode
	var nightmare = $("#mode-nightmare").prop("checked");

	// Clear highlights
	$("#ghost-table tbody tr").removeClass("ghost-match");
	// Clear nightmare omits
	$(".nightmare-omit").removeClass("nightmare-omit");
	// Create filter
	var filter = "";
	var cnt = 0;
	if (dots) {
		filter += ":has(.col-dots)";
		cnt++;
	}
	if (emf) {
		filter += ":has(.col-emf)";
		cnt++;
	}
	if (fingerprint) {
		filter += ":has(.col-fingerprint)";
		cnt++;
	}
	if (freeze) {
		filter += ":has(.col-freeze)";
		cnt++;
	}
	if (orbs) {
		filter += ":has(.col-orbs)";
		cnt++;
	}
	if (writing) {
		filter += ":has(.col-writing)";
		cnt++;
	}
	if (spirit) {
		filter += ":has(.col-spirit)";
		cnt++;
	}
	// Set highlights
	if (cnt > 0) {
		$("#ghost-table tbody tr" + filter).addClass("ghost-match");
		// Check the evidences remain
		check_remain("dots");
		check_remain("emf");
		check_remain("fingerprint");
		check_remain("freeze");
		check_remain("orbs");
		check_remain("writing");
		check_remain("spirit");
		// Special omittion only usable in the nightmare mode
		if (nightmare && cnt >= 2) {
			check_nightmare_omit("dots", dots);
			check_nightmare_omit("emf", emf);
			check_nightmare_omit("fingerprint", fingerprint);
			check_nightmare_omit("freeze", freeze);
			check_nightmare_omit("orbs", orbs);
			check_nightmare_omit("writing", writing);
			check_nightmare_omit("spirit", spirit);
		}
	}
}

function check_remain(evidence) {
	if ($(".ghost-match td.col-" + evidence).length > 0) {
		// Evidence remains
		$("#row-evidence-" + evidence).removeClass("evidence-omit");
		$("#check-" + evidence).prop("disabled", false);
	} else {
		// Evidence not remains
		$("#row-evidence-" + evidence).addClass("evidence-omit");
		$("#check-" + evidence).prop("disabled", true);
	}
}

function check_nightmare_omit(evidence, check) {
	if ($(".ghost-match:has(td.col-" + evidence + ".nightmare-evidence)").length > 0) {
		if (!check) {
			$(".ghost-match:has(td.col-" + evidence + ".nightmare-evidence)").addClass("nightmare-omit");
		}
	}
}

window.onload = function() {
	// Add event listener to the checkboxes
	$("#check-dots").on("click", check_evidence);
	$("#check-emf").on("click", check_evidence);
	$("#check-fingerprint").on("click", check_evidence);
	$("#check-freeze").on("click", check_evidence);
	$("#check-orbs").on("click", check_evidence);
	$("#check-writing").on("click", check_evidence);
	$("#check-spirit").on("click", check_evidence);
	// Nightmare mode checkbox
	$("#mode-nightmare").on("click", check_evidence);

	// The "Clear" button
	$("#evidence-clear").on("click", function(){
		// Uncheck all checkboxes
		$("#check-dots").prop("checked", false);
		$("#check-emf").prop("checked", false);
		$("#check-fingerprint").prop("checked", false);
		$("#check-freeze").prop("checked", false);
		$("#check-orbs").prop("checked", false);
		$("#check-writing").prop("checked", false);
		$("#check-spirit").prop("checked", false);
		// Clear highlights
		$("#ghost-table tbody tr").removeClass("ghost-match");
		// Enable all evidences
		$(".evidence-omit td input").prop("disabled", false);
		$(".evidence-omit").removeClass("evidence-omit");
	});
}