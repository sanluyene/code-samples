<!--
    Author: Ashley Sattler
    Description: This is a financial data entry page
    Coordinates with FFR.js and FFR.aspx.cs files
-->

<%@ Page Title="" Language="C#" MasterPageFile="~/SLAA.Master" AutoEventWireup="true" CodeBehind="SLAA_Federal_Financial_Report.aspx.cs" Inherits="IMLS.SPR.Ui.SLAA_Federal_Financial_Report" %>
<asp:Content ID="Content1" ContentPlaceHolderID="pageTitle" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="pageNav" runat="server">
    <asp:Literal ID="pageNav" runat="server" />
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="pageError" runat="server">
    <asp:Literal ID="ErrorText" runat="server" />
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="pageContent" runat="server">

    <h2>Federal Financial Report</h2>

    <form class="form-horizontal" role="form" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>
        <div id="page-ffr" style="display: none;"></div>
        <div class="form-group">
            <p><span class="col-md-6">Select a fiscal year: <asp:DropDownList ID="ddlFY" runat="server" AutoPostBack="True" OnSelectedIndexChanged="ddlFY_SelectedIndexChanged"></asp:DropDownList></span>
            <span class="col-md-6">Select Version: <asp:DropDownList ID="ddlVersion" runat="server" AutoPostBack="true" OnSelectedIndexChanged="ddlVersion_SelectedIndexChanged"></asp:DropDownList></span></p>
        </div>

        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <asp:Button ID="btnUpdate" runat="server" Text="Save" CssClass="btn btn-primary save-project" OnClick="btnUpdate_Click" />
                <asp:Button ID="btnCancel" runat="server" Text="Cancel" CssClass="btn btn-primary" OnClick="btnCancel_Click" CausesValidation="False" />
                <asp:Button ID="btnPrint" runat="server" Text="Print" CssClass="btn btn-primary" OnClick="btnPrint_Click" />
                <asp:Button ID="btnCertify" runat="server" Text="Certify" CssClass="btn btn-primary save-project" OnClick="btnCertify_Click" />
            </div>
        </div>

        <div class="row">
            <p>Red asterisks denote fields that will be checked upon Certify.</p>
        </div>

        <div class="row">
            <div class="form-box">
                <div class="form-group">
                    <label class="col-md-8 control-label">Federal Agency and Organizational Element to Which Report is Submitted</label>
                    <div class="col-md-4"><asp:Label ID="txtFederalAgency" runat="server" /></div>
                </div>
                <div class="form-group">
                    <label class="col-md-8 control-label">Federal Grant or Other Identifying Number Assigned by Federal Agency<span class="req-field" /></label>
                    <div class="col-md-4"><asp:TextBox ID="txtFederalGrantNum" CssClass="form-control input-sm req-field" runat="server" /></div>
                </div>
                <div class="form-group">
                    <label class="col-md-6 control-label">Recipient Organization (Name and complete address including Zip code)</label>
                    <div class="col-md-6"><asp:TextBox ID="txtRecipientOrg" CssClass="form-control input-sm" runat="server" /></div>
                </div>
                <div class="form-group">
                    <label class="col-md-6 control-label">DUNS Number</label>
                    <div class="col-md-6"><asp:TextBox ID="txtAgencyDUNS" CssClass="form-control input-sm" runat="server" /></div>
                </div>
                <div class="form-group">
                    <label class="col-md-6 control-label">EIN</label>
                    <div class="col-md-6"><asp:TextBox ID="txtAgencyEIN" CssClass="form-control input-sm" runat="server" /></div>
                </div>
                <div class="form-group">
                    <label class="col-md-8 control-label">Recipient Account Number or Identifying Number</label>
                    <div class="col-md-4"><asp:TextBox ID="txtRecipientAccountNum" CssClass="form-control input-sm" runat="server" /></div>
                </div>
            </div>

            <div class="row col-md-offset-1">
                <div class="form-box col-md-5">
                    <h4>Report Type<span class="req-field" /></h4>
                    <p><asp:RadioButton ID="rbQuaterly" runat="server" Text="Quaterly" GroupName="ReportType" /></p>
                    <p><asp:RadioButton ID="rbSemiAnnual" runat="server" Text="Semi-Annual" GroupName="ReportType" /></p>
                    <p><asp:RadioButton ID="rbAnnual" runat="server" Text="Annual" GroupName="ReportType" /></p>
                    <p><asp:RadioButton ID="rbFinal" runat="server" Text="Final" GroupName="ReportType" /></p>
                </div>
                <div class="form-box col-md-5">
                    <h4>Basis of Accounting<span class="req-field" /></h4>
                    <p><asp:RadioButton ID="rbCash" runat="server" Text="Cash" GroupName="ReportBasis" /></p>
                    <p><asp:RadioButton ID="rbAccrual" runat="server" Text="Accrual" GroupName="ReportBasis" /></p>
                </div>
            </div>
        
            <div class="row col-md-offset-1">
                <div class="form-box col-md-5">
                    <h4>Project/Grant Period</h4>
                    <div class="form-group">
                        <label class="col-md-5 control-label">From</label>
                        <div class="col-md-7"><asp:TextBox ID="txtGrantStartDate" CssClass="form-control datefield input-sm" runat="server" /></div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-5 control-label">To</label>
                        <div class="col-md-7"><asp:TextBox ID="txtGrantEndDate" CssClass="form-control datefield input-sm" runat="server" /></div>
                    </div>
                </div>
                <div class="form-box col-md-5">
                    <h4>Report Period End Date</h4>
                    <div class="form-group">
                        <div class="col-md-7"><asp:TextBox ID="txtReportEndDate" CssClass="form-control datefield input-sm" runat="server" /></div>
                    </div>
                </div>
            </div>
                
            <div class="form-box">
                <h4 class="col-md-12">Transactions</h4>
                <div class="form-group">
                    <h5 class="col-md-12">Federal Cash</h5>
                    <label class="col-md-8 control-label">Cash Receipts<span class="req-field" /></label>
                    <span class="currency">$</span><div class="col-md-4"><asp:TextBox ID="txtFedCashReceipts" CssClass="form-control input-sm ffr" runat="server" ClientIDMode="Static" /></div>
                    <label class="col-md-8 control-label">Cash Disbursements<span class="req-field" /></label>
                    <span class="currency">$</span><div class="col-md-4"><asp:TextBox ID="txtFedCashDisburse" CssClass="form-control input-sm ffr" runat="server" ClientIDMode="Static" /></div>
                    <label class="col-md-8 control-label">Cash on Hand</label>
                    <span class="currency">$</span><div class="col-md-4"><asp:TextBox ID="txtFedCashOnHand" CssClass="form-control input-sm" runat="server" ClientIDMode="Static" /></div>
                </div>
                <div class="form-group">
                    <h5 class="col-md-12">Federal Expenditures and Unobligated Balance</h5>
                    <label class="col-md-8 control-label">Total Federal funds authorized<span class="req-field" /></label>
                    <span class="currency">$</span><div class="col-md-4"><asp:TextBox ID="txtFETotalAuthorized" CssClass="form-control input-sm" runat="server" ClientIDMode="Static" /></div>
                    <label class="col-md-8 control-label">Federal share of expenditures<span class="req-field" /></label>
                    <span class="currency">$</span><div class="col-md-4"><asp:TextBox ID="txtFEExpenditures" CssClass="form-control ffr input-sm" runat="server" ClientIDMode="Static" /></div>
                    <label class="col-md-8 control-label">Federal share of unliquidated obligations<span class="req-field" /></label>
                    <span class="currency">$</span><div class="col-md-4"><asp:TextBox ID="txtFEUnliquidatedObl" CssClass="form-control ffr input-sm" runat="server" ClientIDMode="Static" /></div>
                    <label class="col-md-8 control-label">Total Federal share</label>
                    <span class="currency">$</span><div class="col-md-4"><asp:TextBox ID="txtFETotal" CssClass="form-control input-sm" runat="server" ClientIDMode="Static" /></div>
                    <label class="col-md-8 control-label">Unobligated balance of Federal funds</label>
                    <span class="currency">$</span><div class="col-md-4"><asp:TextBox ID="txtFEUnobligatedBalance" CssClass="form-control input-sm" runat="server" ClientIDMode="Static" /></div>
                </div>
                <div class="form-group">
                    <h5 class="col-md-12">Recipient Share</h5>
                    <label class="col-md-8 control-label">Total recipient share required<span class="req-field" /></label>
                    <span class="currency">$</span><div class="col-md-4"><asp:TextBox ID="txtRSTotalReq" CssClass="form-control input-sm" runat="server" ClientIDMode="Static" /></div>
                    <label class="col-md-8 control-label">Recipient share of expenditures<span class="req-field" /></label>
                    <span class="currency">$</span><div class="col-md-4"><asp:TextBox ID="txtRSExpenditures" CssClass="form-control ffr input-sm" runat="server" ClientIDMode="Static" /></div>
                    <label class="col-md-8 control-label">Remaining recipient share to be provided</label>
                    <span class="currency">$</span><div class="col-md-4"><asp:TextBox ID="txtRSProvided" CssClass="form-control input-sm" runat="server" ClientIDMode="Static" /></div>
                </div>
                <div class="form-group">
                    <h5 class="col-md-12">Program Income</h5>
                    <label class="col-md-8 control-label">Total Federal program income earned<span class="req-field" /></label>
                    <span class="currency">$</span><div class="col-md-4"><asp:TextBox ID="txtPITotalIncome" CssClass="form-control ffr input-sm" runat="server" ClientIDMode="Static" /></div>
                    <label class="col-md-8 control-label">Program income expended in accordance with the deduction alternative<span class="req-field" /></label>
                    <span class="currency">$</span><div class="col-md-4"><asp:TextBox ID="txtPIDeductionAlt" CssClass="form-control ffr input-sm" runat="server" ClientIDMode="Static" /></div>
                    <label class="col-md-8 control-label">Program income expended in accordance with the addition alternative<span class="req-field" /></label>
                    <span class="currency">$</span><div class="col-md-4"><asp:TextBox ID="txtPIAdditionAlt" CssClass="form-control ffr input-sm" runat="server" ClientIDMode="Static" /></div>
                    <label class="col-md-8 control-label">Unexpended program income<span class="req-field" /></label>
                    <span class="currency">$</span><div class="col-md-4"><asp:TextBox ID="txtPIUnexpendedIncome" CssClass="form-control ffr input-sm" runat="server" ClientIDMode="Static" /></div>
                </div>
            </div>

            <div class="form-box">
                <h4 class="col-md-12">Indirect Expense(s)</h4>
                <div class="form-group">
                    <div class="form-group col-md-12">
                        <label class="col-md-2 col-md-offset-1 control-label">Type</label>
                        <label class="col-md-2 col-md-offset-1 control-label">Rate</label>
                        <label class="col-md-3 col-md-offset-2 control-label">Period</label>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3"><asp:TextBox ID="txtIETypeA" CssClass="form-control input-sm" runat="server" ClientIDMode="Static" /></div>
                        <div class="col-md-3"><asp:TextBox ID="txtIERateA" CssClass="form-control input-sm" runat="server" ClientIDMode="Static" /></div>
                        <label class="col-md-1 col-md-offset-1 control-label">From: </label>
                        <div class="col-md-3"><asp:TextBox ID="txtIEPeriodStartA" CssClass="form-control datefield input-sm" runat="server" ClientIDMode="Static" /></div>
                    </div>
                    <div class="form-group col-md-12">
                        <label class="col-md-1 col-md-offset-7 control-label">To: </label>
                        <div class="col-md-3"><asp:TextBox ID="txtIEPeriodEndA" CssClass="form-control datefield input-sm" runat="server" ClientIDMode="Static" /></div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 col-md-offset-1 control-label">Base</label>
                        <label class="col-md-3 col-md-offset-2 control-label">Amount Charged</label>
                        <label class="col-md-3 col-md-offset-1 control-label">Federal Share</label>
                    </div>
                    <div class="form-group">
                        <span class="currency col-md-offset-1">$</span><div class="col-md-3"><asp:TextBox ID="txtIEBaseA" CssClass="form-control ffr input-sm" runat="server" ClientIDMode="Static" /></div>
                        <span class="currency col-md-offset-1">$</span><div class="col-md-3"><asp:TextBox ID="txtIEAmtChargedA" CssClass="form-control ffr input-sm" runat="server" ClientIDMode="Static" /></div>
                        <span class="currency col-md-offset-1">$</span><div class="col-md-3"><asp:TextBox ID="txtIEFedShareA" CssClass="form-control ffr input-sm" runat="server" ClientIDMode="Static" /></div>
                    </div>
                </div>
                <hr />
                <div class="form-group">
                    <div class="form-group col-md-12">
                        <label class="col-md-2 col-md-offset-1 control-label">Type</label>
                        <label class="col-md-2 col-md-offset-1 control-label">Rate</label>
                        <label class="col-md-3 col-md-offset-2 control-label">Period From-To</label>
                    </div>
                    <div class="form-group col-md-12">
                        <div class="col-md-3"><asp:TextBox ID="txtIETypeB" CssClass="form-control input-sm" runat="server" ClientIDMode="Static" /></div>
                        <div class="col-md-3"><asp:TextBox ID="txtIERateB" CssClass="form-control input-sm" runat="server" ClientIDMode="Static" /></div>
                        <label class="col-md-1 col-md-offset-1 control-label">From: </label>
                        <div class="col-md-3"><asp:TextBox ID="txtIEPeriodStartB" CssClass="form-control datefield input-sm" runat="server" ClientIDMode="Static" /></div>
                    </div>
                    <div class="form-group col-md-12">
                        <label class="col-md-1 col-md-offset-7 control-label">To: </label>
                        <div class="col-md-3"><asp:TextBox ID="txtIEPeriodEndB" CssClass="form-control datefield input-sm" runat="server" ClientIDMode="Static" /></div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 col-md-offset-1 control-label">Base</label>
                        <label class="col-md-3 col-md-offset-2 control-label">Amount Charged</label>
                        <label class="col-md-3 col-md-offset-1 control-label">Federal Share</label>
                    </div>
                    <div class="form-group">
                        <span class="currency col-md-offset-1">$</span><div class="col-md-3"><asp:TextBox ID="txtIEBaseB" CssClass="form-control ffr input-sm" runat="server" ClientIDMode="Static" /></div>
                        <span class="currency col-md-offset-1">$</span><div class="col-md-3"><asp:TextBox ID="txtIEAmtChargedB" CssClass="form-control ffr input-sm" runat="server" ClientIDMode="Static" /></div>
                        <span class="currency col-md-offset-1">$</span><div class="col-md-3"><asp:TextBox ID="txtIEFedShareB" CssClass="form-control ffr input-sm" runat="server" ClientIDMode="Static" /></div>
                    </div>
                </div>
                <hr />
                <div class="form-group">
                    <div class="form-group">
                        <label class="col-md-2 col-md-offset-1 control-label">Base Total</label>
                        <label class="col-md-3 col-md-offset-2 control-label">Amount Charged Total</label>
                        <label class="col-md-3 col-md-offset-1 control-label">Federal Share Total</label>
                    </div>
                    <div class="form-group">
                        <span class="currency col-md-offset-1">$</span><div class="col-md-3"><asp:TextBox ID="txtIEBaseTotal" CssClass="form-control input-sm" runat="server" ClientIDMode="Static" /></div>
                        <span class="currency col-md-offset-1">$</span><div class="col-md-3"><asp:TextBox ID="txtIEAmtChargedTotal" CssClass="form-control input-sm" runat="server" ClientIDMode="Static" /></div>
                        <span class="currency col-md-offset-1">$</span><div class="col-md-3"><asp:TextBox ID="txtIEFedShareTotal" CssClass="form-control input-sm" runat="server" ClientIDMode="Static" /></div>
                    </div>
                </div>

            </div>
            
            <div class="form-box">
                <div class="form-group">
                    <label class="col-md-2 control-label">Remarks</label>
                    <div class="col-md-10"><asp:TextBox ID="txtRemarks" CssClass="form-control input-sm" ClientIDMode="Static" runat="server" /></div>
                </div>
            </div>
                
            <div class="form-box" runat="server">
                <h4 class="col-md-12">Certification</h4>
                <div class="form-group">
                    <label class="col-md-6 control-label">Name of Authorized Certifying Official</label>
                    <div class="col-md-6"><asp:TextBox ID="txtOfficalName" CssClass="form-control input-sm" runat="server" /></div>
                </div>
                <div class="form-group">
                    <label class="col-md-6 control-label">Title of Authorized Certifying Official</label>
                    <div class="col-md-6"><asp:TextBox ID="txtOfficialTitle" CssClass="form-control input-sm" runat="server" /></div>
                </div>
                <div class="form-group">
                    <label class="col-md-6 control-label">Signature of Authorized Certifying Official</label>
                    <div class="col-md-6"><asp:TextBox ID="txtOfficialSignature" CssClass="form-control input-sm" runat="server" /></div>
                </div>
                <div class="form-group">
                    <label class="col-md-6 control-label">Phone Number of Authorized Certifying Official</label>
                    <div class="col-md-6"><asp:TextBox ID="txtOfficialPhone" CssClass="form-control input-sm" runat="server" /></div>
                </div>
                <div class="form-group">
                    <label class="col-md-6 control-label">Email of Authorized Certifying Official</label>
                    <div class="col-md-6"><asp:TextBox ID="txtOfficialEmail" CssClass="form-control input-sm" runat="server" /></div>
                </div>
                <div class="form-group">
                    <label class="col-md-7 control-label">Report Status</label>
                    <div class="col-md-5"><asp:Label ID="txtReportStatus" CssClass="form-control input-sm" runat="server" ClientIDMode="Static" /></div>
                </div>
                <div class="form-group">
                    <label class="col-md-6 control-label">Date Report Certified</label>
                    <div class="col-md-6"><asp:TextBox ID="txtDateSubmit" CssClass="form-control input-sm" runat="server" /></div>
                </div>
            </div>
        </div>
        
        <asp:Panel ID="ffrComments" runat="server">
            <div class="row commentsrow">
                <div class="form-box">
                    <div class="form-box">
                        <h4 class="col-md-12 comments">Comments (for SLAA review)</h4>
                            <asp:TextBox runat="server" ClientIDMode="Static" ID="txtComments" TextMode="MultiLine" Rows="4" Columns="60"></asp:TextBox>
                    </div>
                </div>
            </div>
        </asp:Panel>

        <asp:TextBox ID="lblId" runat="server" CssClass="invisible" />

        <div class="row">
            <div class="col-md-5 col-md-offset-5">
                <asp:Button ID="btnFSRUpdate" runat="server" Text="Save" CssClass="btn btn-primary save-project" OnClick="btnUpdate_Click" />
                <asp:Button ID="btnFSRCancel" runat="server" Text="Cancel" CssClass="btn btn-primary" OnClick="btnCancel_Click" CausesValidation="False" />
            </div>
        </div>
    </form>
</asp:Content>
