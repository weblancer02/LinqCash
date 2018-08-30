$(document).ready(function() {
  $("form").submit(function(e) {
    e.preventDefault();
    e.stopPropagation();

    a = validateAddress($("#input-address"));
    b = validateAmount($("#input-amount"));
    c = validateOTP($("#input-otp"));

    if (a == false && b == false && c == false) {
      $(".md-content h3").html(
        '<i class="fab fa-bitcoin"/> <span>Bitcoin sent!</spa>'
      );
      $(".md-content p").html(
        "<p>The Bitcoin (" +
          $("#input-amount").val() +
          ") has been sent to the receiver's Bitcoin wallet.  A copy of this transaction has been posted on your dashboard. <br/><br/><strong>Thank you for using our service!</strong> <br/></p>"
      );

      resetFields();
    } else {
      errorCount = $.grep([a, b, c], function(n, i) {
        return n == true;
      });

      pluralize = errorCount.length > 1 ? "are errors" : "is an error";
      errorHTML = "";
      errorHTML +=
        a == true ? "<li>Bitcoin address is in an invalid format.</li>" : "";
      errorHTML +=
        b == true ? "<li>Amount must be numeric and/or required.</li>" : "";
      errorHTML += c == true ? "<li>OTP is invalid or has expired.</li>" : "";

      $(".md-content h3").html(
        '<i class="fab fa-bitcoin"/> <span>Error sending</spa>'
      );
      $(".md-content p").html(
        "<p>There " +
          pluralize +
          " found in your request : <ul>" +
          errorHTML +
          "</ul></p>"
      );
    }
  });
});

$("input").focusout(function() {
  if ($(this).attr("id") == "input-address") {
    if ($(this).val() != "") {
      validateAddress($(this));
    } else {
      unsetErrors(".error-address");
    }
  } else if ($(this).attr("id") == "input-amount") {
    if ($(this).val() != "") {
      validateAmount($(this));
    } else {
      unsetErrors(".error-amount");
    }
  } else if ($(this).attr("id") == "input-otp") {
    if ($(this).val() == "") {
      unsetErrors(".error-otp");
    }
  }
});

function validateAddress(el) {
  var reg = /^1[1-9A-Za-z][^OIl]{20,40}/;
  if (!reg.test(el.val())) {
    setErrors(".error-address", "Invalid Bitcoin Address");
    return true;
  } else {
    unsetErrors(".error-address");
    return false;
  }
}

function validateAmount(el) {
  if (!$.isNumeric(el.val())) {
    setErrors(".error-amount", "Invalid Bitcoin Amount");
    return true;
  } else {
    unsetErrors(".error-amount");
    return false;
  }
}

function validateOTP(el) {
  if (el.val() == "") {
    setErrors(".error-otp", "Invalid One-time password");
    return true;
  } else {
    unsetErrors(".error-otp");
    return false;
  }
}

function setErrors(errorSpan, msg) {
  $(errorSpan).text(msg);
  $(errorSpan).animate({ opacity: "1", marginRight: "0px" }, 100, "linear");
}

function unsetErrors(errorSpan) {
  $(errorSpan).text("");
  $(errorSpan).animate({ opacity: "0", marginRight: "20px" }, 100, "linear");
}

function resetFields() {
  $("#input-address").val("");
  $("#input-amount").val("");
  $("#input-otp").val("");
}
