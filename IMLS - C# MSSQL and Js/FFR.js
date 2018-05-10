// Author: Ashley Sattler
// Description: Partial JS file for numeric calculations on C# page
// Includes field validation and confirmation

function FFRCalculations() {
    var FedCashOnHand = 0;
    var FedCashReceipts = parseFloat($('#txtFedCashReceipts').val());
    var FedCashDisburse = parseFloat($('#txtFedCashDisburse').val());
    var FETotal = 0;
    var FEExpenditures = parseFloat($('#txtFEExpenditures').val());
    var FEUnliquidatedObl = parseFloat($('#txtFEUnliquidatedObl').val());
    var FEUnobligatedBalance = 0;
    var FETotalAuthorized = parseFloat($('#txtFETotalAuthorized').val());
    var RSProvided = 0;
    var RSTotalReq = parseFloat($('#txtRSTotalReq').val());
    var RSExpenditures = parseFloat($('#txtRSExpenditures').val());
    var PIUnexpendedIncome = 0;
    var PITotalIncome = parseFloat($('#txtPITotalIncome').val());
    var PIDeductionAlt = parseFloat($('#txtPIDeductionAlt').val());
    var PIAdditionAlt = parseFloat($('#txtPIAdditionAlt').val());
    var IEBaseTotal = 0;
    var IEBaseA = parseFloat($('#txtIEBaseA').val());
    var IEBaseB = parseFloat($('#txtIEBaseB').val());
    var IEAmtChargedTotal = 0;
    var IEAmtChargedA = parseFloat($('#txtIEAmtChargedA').val());
    var IEAmtChargedB = parseFloat($('#txtIEAmtChargedB').val());
    var IEFedShareTotal = 0;
    var IEFedShareA = parseFloat($('#txtIEFedShareA').val());
    var IEFedShareB = parseFloat($('#txtIEFedShareB').val());
    var status = $('#txtReportStatus').text();

    if (status == "Draft") {
        $(".ffr").each(function () {
            FedCashOnHand = FedCashReceipts - FedCashDisburse;
            FETotal = FEExpenditures + FEUnliquidatedObl;
            FEUnobligatedBalance = FETotalAuthorized - FETotal;
            RSProvided = RSTotalReq - RSExpenditures;
            //PIUnexpendedIncome = PITotalIncome - (PIDeductionAlt || PIAdditionAlt);
            IEBaseTotal = IEBaseA + IEBaseB;
            IEAmtChargedTotal = IEAmtChargedA + IEAmtChargedB;
            IEFedShareTotal = IEFedShareA + IEFedShareB;

            $('#txtFedCashOnHand').val(FedCashOnHand.toFixed(2));
            $('#txtFETotal').val(FETotal.toFixed(2));
            $('#txtFEUnobligatedBalance').val(FEUnobligatedBalance.toFixed(2));
            $('#txtRSProvided').val(RSProvided.toFixed(2));
            //$('#txtPIUnexpendedIncome').val(PIUnexpendedIncome.toFixed(2));
            $('#txtIEBaseTotal').val(IEBaseTotal.toFixed(2));
            $('#txtIEAmtChargedTotal').val(IEAmtChargedTotal.toFixed(2));
            $('#txtIEFedShareTotal').val(IEFedShareTotal.toFixed(2));

            if (parseFloat($('#txtFedCashOnHand').val()) < 0) $('#txtFedCashOnHand').addClass("neg-value");
            else $('#txtFedCashOnHand').removeClass("neg-value");
            if (parseFloat($('#txtFETotal').val()) < 0) $('#txtFETotal').addClass("neg-value");
            else $('#txtFETotal').removeClass("neg-value");
            if (parseFloat($('#txtFEUnobligatedBalance').val()) < 0) $('#txtFEUnobligatedBalance').addClass("neg-value");
            else $('#txtFEUnobligatedBalance').removeClass("neg-value");
            if (parseFloat($('#txtRSProvided').val()) < 0) $('#txtRSProvided').addClass("neg-value");
            else $('#txtRSProvided').removeClass("neg-value");
            //if (parseFloat($('#txtPIUnexpendedIncome').val()) < 0) $('#txtPIUnexpendedIncome').addClass("neg-value");
            //else $('#txtPIUnexpendedIncome').removeClass("neg-value");
            if (parseFloat($('#txtIEBaseTotal').val()) < 0) $('#txtIEBaseTotal').addClass("neg-value");
            else $('#txtIEBaseTotal').removeClass("neg-value");
            if (parseFloat($('#txtIEAmtChargedTotal').val()) < 0) $('#txtIEAmtChargedTotal').addClass("neg-value");
            else $('#txtIEAmtChargedTotal').removeClass("neg-value");
            if (parseFloat($('#txtIEFedShareTotal').val()) < 0) $('#txtIEFedShareTotal').addClass("neg-value");
            else $('#txtIEFedShareTotal').removeClass("neg-value");
        })
    };
}

function BindNumericFields() {
    $(".numeric-only").focus(function () {
        var num = ($(this).val());
        if (num == '-1') {
            $(this).val('');
        }
    });
    $(".numeric-only").blur(function () {
        var num = $(this).val();
        if (num == '') {
            $(this).val('-1');
        }
    });
    $(".numeric-only").keydown(function (event) {
        if (event.shiftKey == true) {
            event.preventDefault();
        }
        if ((event.keyCode >= 48 && event.keyCode <= 57) ||
            (event.keyCode >= 96 && event.keyCode <= 105) ||
            event.keyCode == 8 || event.keyCode == 37 ||
            event.keyCode == 39 || event.keyCode == 46) {

        } else {
            event.preventDefault();
        }
    });
}

$(document).ready(function () {
    // Field Validation
    if ($("span.req-field").length > 0) {
        $("span.req-field").html(" *");

        $(".save-project").click(function () {
            var allowSubmit = true;
            $("input.req-field").each(function () {
                if ($(this).val() == "") {
                    $(this).parent().addClass("has-error");
                    allowSubmit = false;
                }
            });

            // For Input type:Radio
            $(".req-radio").each(function () {
                if ($('input[type="radio"]:checked', this).length == 0) {
                    allowSubmit = false;
                }
            });

            // For TextMode="multiline"
            $(".req-textbox").each(function () {
                if ($(this).val().length == 0) {
                    allowSubmit = false;
                }
            });

            // For Input type:Checkbox
            $(".req-check").each(function () {
                if ($('input[type="checkbox"]:checked', this).length == 0) {
                    allowSubmit = false;
                }
            });

            // For passwords
            $(".pass").each(function () {
                var passCurrent = $("#lblEncCurrent").text();
                var passCurrentEntered = $("#txtPassOld").val();

                if (passCurrentEntered != '' && passCurrentEntered != passCurrent) {
                    allowSubmit = false;
                }
            });

            if (allowSubmit == false) {
                $("#error-box").html("You Have Not Populated The Required Fields.");
                $("#error-box").show();
                $("html, body").animate({ scrollTop: 0 }, "fast");
                return allowSubmit;
            }
        });
    }

    // number only fields
    if ($(".numeric-only").length > 0) {
        BindNumericFields();
    }

    // delete button confirmation
    if ($(".user-confirm").length > 0) {
        $(".user-confirm").click(function () {
            if (!confirm('Are you sure you want to delete this?')) {
                return false;
            }
        });
    }

    // Federal Financial Report Validation
    if ($("#page-ffr").length > 0) {
        $(".ffr").focus(function () {
            var num = ($(this).val());
            if (num == '0.00') {
                $(this).val('');
            }
        });

        $(".ffr").blur(function () {
            var num = $(this).val();
            if (num == '') {
                $(this).val('0.00');
            }

            var oldval = parseFloat($(this).val());
            var newval = $(this).val(oldval.toFixed(2));

            FFRCalculations();
        });

        $(".ffr").keydown(function (event) {
            if (event.shiftKey == true) {
                event.preventDefault();
            }
            if ((event.keyCode >= 48 && event.keyCode <= 57) ||
                (event.keyCode >= 96 && event.keyCode <= 105) ||
                event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 ||
                event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190 ||
                event.keyCode == 110 || event.keyCode == 173 || event.keyCode == 109) {

            } else {
                event.preventDefault();
            }
            //if a decimal has been added, disable the "."-button
            if ($(this).val().indexOf('.') != -1 && event.keyCode == 190) {
                event.preventDefault();
            }
        });

        $(".ffr").each(function () {
            FFRCalculations();
        });
    }
});