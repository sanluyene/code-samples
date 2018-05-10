/*
    Author: Ashley Sattler
    Description: This is the code-behind for a financial data entry page
    Coordinates with FFR.js and FFR.aspx files
*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using IMLS.SPR.Core;

namespace IMLS.SPR.Ui
{
    public partial class SLAA_Federal_Financial_Report : System.Web.UI.Page
    {
        private SLAA slaa = new SLAA();
        int SelectedFY = 4;
        int SelectedVersion = 1;

        protected void Page_Load(object sender, EventArgs e)
        {
            ErrorText.Text = "";

            Main.Session.CurrentNav = Main.Session.Nav.Find(n => n.NavId == 10);
            pageNav.Text = slaa.GetNav();
            IMLS.SPR.Core.DTO.User user = Main.Session.CurrentUser;

            btnCertify.Enabled = false;

            txtFedCashOnHand.Attributes.Add("readonly", "readonly");
            txtFETotal.Attributes.Add("readonly", "readonly");
            txtFETotalAuthorized.Attributes.Add("readonly", "readonly");
            txtFEUnobligatedBalance.Attributes.Add("readonly", "readonly");
            txtRSTotalReq.Attributes.Add("readonly", "readonly");
            txtRSProvided.Attributes.Add("readonly", "readonly");
            txtIEBaseTotal.Attributes.Add("readonly", "readonly");
            txtIEAmtChargedTotal.Attributes.Add("readonly", "readonly");
            txtIEFedShareTotal.Attributes.Add("readonly", "readonly");
            txtRecipientOrg.Attributes.Add("readonly", "readonly");
            txtAgencyDUNS.Attributes.Add("readonly", "readonly");
            txtAgencyEIN.Attributes.Add("readonly", "readonly");
            txtOfficalName.Attributes.Add("readonly", "readonly");
            txtOfficialTitle.Attributes.Add("readonly", "readonly");
            txtOfficialSignature.Attributes.Add("readonly", "readonly");
            txtOfficialPhone.Attributes.Add("readonly", "readonly");
            txtOfficialEmail.Attributes.Add("readonly", "readonly");
            txtDateSubmit.Attributes.Add("readonly", "readonly");

            if (Main.Session.CurrentUser.UserRole == "Authorized Certifying Official (ACO)" || Main.Session.CurrentUser.UserRole == "Developer") btnCertify.Enabled = true;

            if (!IsPostBack)
            {
                BuildFYDropDown();
                // This is the original default FY selector
                //int currentFYID = slaa.GetFiscalYear().FiscalYearId;
                int currentFYID = slaa.GetDefaultFY() + 1;
                ddlFY.SelectedValue = currentFYID.ToString();
                SelectedFY = slaa.GetSpecificFiscalYear(int.Parse(ddlFY.SelectedValue)).FiscalYearId;
                IMLS.SPR.Core.DTO.FFR ffr = slaa.GetFFR(SelectedFY);
                BuildFFR(ffr);
            }
        }

        private void BuildFYDropDown()
        {
            List<IMLS.SPR.Core.DTO.FiscalYear> fy = Main.FiscalYears;
            ddlFY.DataSource = fy;
            ddlFY.DataValueField = "FiscalYearId";
            ddlFY.DataTextField = "FiscalYearName";
            ddlFY.DataBind();
        }

        private void BuildVersionDropDown(int version)
        {
            ddlVersion.Items.Clear();
            int i = version;
            while (i > 0)
            {
                ddlVersion.Items.Add(new ListItem(i.ToString(), i.ToString()));
                i--;
            }
            ddlVersion.DataBind();
        }

        private void BuildFFR(IMLS.SPR.Core.DTO.FFR ffr)
        {
            if (ffr.ReportStatus == "Draft")
            {
                btnUpdate.Enabled = true;
                btnCertify.Enabled = true;
                txtFederalGrantNum.Attributes.Remove("readonly");
                txtRecipientAccountNum.Attributes.Remove("readonly");
                rbQuaterly.Attributes.Remove("readonly");
                rbSemiAnnual.Attributes.Remove("readonly");
                rbAnnual.Attributes.Remove("readonly");
                rbFinal.Attributes.Remove("readonly");
                rbCash.Attributes.Remove("readonly");
                rbAccrual.Attributes.Remove("readonly");
                txtGrantStartDate.Attributes.Remove("readonly");
                txtGrantEndDate.Attributes.Remove("readonly");
                txtReportEndDate.Attributes.Remove("readonly");
                txtFedCashReceipts.Attributes.Remove("readonly");
                txtFedCashDisburse.Attributes.Remove("readonly");
                txtFEExpenditures.Attributes.Remove("readonly");
                txtFEUnliquidatedObl.Attributes.Remove("readonly");
                txtRSExpenditures.Attributes.Remove("readonly");
                txtPITotalIncome.Attributes.Remove("readonly");
                txtPIDeductionAlt.Attributes.Remove("readonly");
                txtPIAdditionAlt.Attributes.Remove("readonly");
                txtPIUnexpendedIncome.Attributes.Remove("readonly");
                txtIETypeA.Attributes.Remove("readonly");
                txtIERateA.Attributes.Remove("readonly");
                txtIEPeriodStartA.Attributes.Remove("readonly");
                txtIEPeriodEndA.Attributes.Remove("readonly");
                txtIEBaseA.Attributes.Remove("readonly");
                txtIEAmtChargedA.Attributes.Remove("readonly");
                txtIEFedShareA.Attributes.Remove("readonly");
                txtIETypeB.Attributes.Remove("readonly");
                txtIERateB.Attributes.Remove("readonly");
                txtIEPeriodStartB.Attributes.Remove("readonly");
                txtIEPeriodEndB.Attributes.Remove("readonly");
                txtIEBaseB.Attributes.Remove("readonly");
                txtIEAmtChargedB.Attributes.Remove("readonly");
                txtIEFedShareB.Attributes.Remove("readonly");
                txtRemarks.Attributes.Remove("readonly");
            }
            else
            {
                btnUpdate.Enabled = false;
                btnCertify.Enabled = false;
                txtFederalGrantNum.Attributes.Add("readonly", "readonly");
                txtRecipientAccountNum.Attributes.Add("readonly", "readonly");
                rbQuaterly.Attributes.Add("readonly", "readonly");
                rbSemiAnnual.Attributes.Add("readonly", "readonly");
                rbAnnual.Attributes.Add("readonly", "readonly");
                rbFinal.Attributes.Add("readonly", "readonly");
                rbCash.Attributes.Add("readonly", "readonly");
                rbAccrual.Attributes.Add("readonly", "readonly");
                txtGrantStartDate.Attributes.Add("readonly", "readonly");
                txtGrantEndDate.Attributes.Add("readonly", "readonly");
                txtReportEndDate.Attributes.Add("readonly", "readonly");
                txtFedCashReceipts.Attributes.Add("readonly", "readonly");
                txtFedCashDisburse.Attributes.Add("readonly", "readonly");
                txtFEExpenditures.Attributes.Add("readonly", "readonly");
                txtFEUnliquidatedObl.Attributes.Add("readonly", "readonly");
                txtRSExpenditures.Attributes.Add("readonly", "readonly");
                txtPITotalIncome.Attributes.Add("readonly", "readonly");
                txtPIDeductionAlt.Attributes.Add("readonly", "readonly");
                txtPIAdditionAlt.Attributes.Add("readonly", "readonly");
                txtPIUnexpendedIncome.Attributes.Add("readonly", "readonly");
                txtIETypeA.Attributes.Add("readonly", "readonly");
                txtIERateA.Attributes.Add("readonly", "readonly");
                txtIEPeriodStartA.Attributes.Add("readonly", "readonly");
                txtIEPeriodEndA.Attributes.Add("readonly", "readonly");
                txtIEBaseA.Attributes.Add("readonly", "readonly");
                txtIEAmtChargedA.Attributes.Add("readonly", "readonly");
                txtIEFedShareA.Attributes.Add("readonly", "readonly");
                txtIETypeB.Attributes.Add("readonly", "readonly");
                txtIERateB.Attributes.Add("readonly", "readonly");
                txtIEPeriodStartB.Attributes.Add("readonly", "readonly");
                txtIEPeriodEndB.Attributes.Add("readonly", "readonly");
                txtIEBaseB.Attributes.Add("readonly", "readonly");
                txtIEAmtChargedB.Attributes.Add("readonly", "readonly");
                txtIEFedShareB.Attributes.Add("readonly", "readonly");
                txtRemarks.Attributes.Add("readonly", "readonly");
            }

            SelectedFY = Main.FiscalYears.Find(f => f.FiscalYearName == ffr.FiscalYear).FiscalYearId;
            SelectedVersion = ffr.Version;
            int highVersion = slaa.GetFFRHighestVersion(ffr.FFRid);
            BuildVersionDropDown(highVersion);
            ddlVersion.SelectedValue = ffr.Version.ToString();
            IMLS.SPR.Core.DTO.StateInfo si = slaa.GetStateInfo();
            IMLS.SPR.Core.DTO.FinancialStatusReport fsr = slaa.GetFSR(SelectedFY);

            lblId.Text = ffr.FFRid.ToString();
            txtFederalAgency.Text = "Institute of Museum and Library Services";
            txtFederalGrantNum.Text = ffr.FederalGrantNum;
            txtRecipientOrg.Text = ffr.RecipientOrg == "" ? si.AgencyName : ffr.RecipientOrg;
            txtAgencyDUNS.Text = ffr.AgencyDUNS == "" ? si.AgencyDUNS : ffr.AgencyDUNS;
            txtAgencyEIN.Text = ffr.AgencyEIN == "" ? si.AgencyEIN : ffr.AgencyEIN;
            txtRecipientAccountNum.Text = ffr.RecipientAccountNum;

            rbQuaterly.Checked = false;
            rbSemiAnnual.Checked = false;
            rbAnnual.Checked = false;
            rbFinal.Checked = false;
            rbCash.Checked = false;
            rbAccrual.Checked = false;

            if (ffr.ReportType == "quarterly")
            {
                rbQuaterly.Checked = true;
            }
            else if (ffr.ReportType == "semiannual")
            {
                rbSemiAnnual.Checked = true;
            }
            else if (ffr.ReportType == "annual")
            {
                rbAnnual.Checked = true;
            }
            else if (ffr.ReportType == "final")
            {
                rbFinal.Checked = true;
            }

            if (ffr.ReportBasis == "cash")
            {
                rbCash.Checked = true;
            }
            else if (ffr.ReportBasis == "accrual")
            {
                rbAccrual.Checked = true;
            }

            SelectedFY = slaa.GetSpecificFiscalYear(int.Parse(ddlFY.SelectedValue)).FiscalYearId;
            string defaultStartDate = slaa.GetSpecificFiscalYear(SelectedFY).StartDate.ToString("MM/dd/yyyy");
            string defaultEndDate = slaa.GetSpecificFiscalYear(SelectedFY + 1).EndDate.ToString("MM/dd/yyyy");
            string defaultMidEndDate = slaa.GetSpecificFiscalYear(SelectedFY).EndDate.ToString("MM/dd/yyyy");

            //txtGrantStartDate.Text = ffr.GrantStartDate.ToString("MM/dd/yyyy");
            //txtGrantEndDate.Text = ffr.GrantEndDate.ToString("MM/dd/yyyy");
            //txtReportEndDate.Text = ffr.ReportEndDate.ToString("MM/dd/yyyy");
            txtGrantStartDate.Text = ffr.GrantStartDate.ToString("MM/dd/yyyy") == "01/01/0001" ? defaultStartDate : ffr.GrantStartDate.ToString("MM/dd/yyyy");
            txtGrantEndDate.Text = ffr.GrantEndDate.ToString("MM/dd/yyyy") == "01/01/0001" ? defaultEndDate : ffr.GrantEndDate.ToString("MM/dd/yyyy");
            txtReportEndDate.Text = ffr.ReportEndDate.ToString("MM/dd/yyyy") == "01/01/0001" ? defaultMidEndDate : ffr.ReportEndDate.ToString("MM/dd/yyyy");

            txtFedCashReceipts.Text = ffr.ReportStatus == "Draft" ? ffr.FedCashReceipts.ToString() : ffr.FedCashReceipts.ToString("N2");
            txtFedCashDisburse.Text = ffr.ReportStatus == "Draft" ? ffr.FedCashDisburse.ToString() : ffr.FedCashDisburse.ToString("N2");
            txtFedCashOnHand.Text = ffr.FedCashOnHand.ToString("N2");

            if (ffr.FETotalAuthorized == 0) txtFETotalAuthorized.Text = ffr.ReportStatus == "Draft" ? fsr.Allotment.ToString() : fsr.Allotment.ToString("N2");
            else txtFETotalAuthorized.Text = ffr.ReportStatus == "Draft" ? ffr.FETotalAuthorized.ToString() : ffr.FETotalAuthorized.ToString("N2");
            
            txtFEExpenditures.Text = ffr.ReportStatus == "Draft" ? ffr.FEExpenditures.ToString() : ffr.FEExpenditures.ToString("N2");
            txtFEUnliquidatedObl.Text = ffr.ReportStatus == "Draft" ? ffr.FEUnliquidatedObl.ToString() : ffr.FEUnliquidatedObl.ToString("N2");
            txtFETotal.Text = ffr.FETotal.ToString("N2");
            txtFEUnobligatedBalance.Text = ffr.FEUnobligatedBalance.ToString("N2");

            if (ffr.RSTotalReq == 0) txtRSTotalReq.Text = ffr.ReportStatus == "Draft" ? fsr.MinMatch.ToString() : fsr.MinMatch.ToString("N2");
            else txtRSTotalReq.Text = ffr.ReportStatus == "Draft" ? ffr.RSTotalReq.ToString() : ffr.RSTotalReq.ToString("N2");

            txtRSExpenditures.Text = ffr.ReportStatus == "Draft" ? ffr.RSExpenditures.ToString() : ffr.RSExpenditures.ToString("N2");
            txtRSProvided.Text = ffr.RSProvided.ToString("N2");
            txtPITotalIncome.Text = ffr.ReportStatus == "Draft" ? ffr.PITotalIncome.ToString() : ffr.PITotalIncome.ToString("N2");
            txtPIDeductionAlt.Text = ffr.ReportStatus == "Draft" ? ffr.PIDeductionAlt.ToString() : ffr.PIDeductionAlt.ToString("N2");
            txtPIAdditionAlt.Text = ffr.ReportStatus == "Draft" ? ffr.PIAdditionAlt.ToString() : ffr.PIAdditionAlt.ToString("N2");
            txtPIUnexpendedIncome.Text = ffr.ReportStatus == "Draft" ? ffr.PIUnexpendedIncome.ToString() : ffr.PIUnexpendedIncome.ToString("N2");
            txtIETypeA.Text = ffr.IETypeA;
            txtIERateA.Text = ffr.IERateA;

            //txtIEPeriodStartA.Text = ffr.IEPeriodStartA.ToString("MM/dd/yyyy");
            //txtIEPeriodEndA.Text = ffr.IEPeriodEndA.ToString("MM/dd/yyyy");
            txtIEPeriodStartA.Text = ffr.IEPeriodStartA.ToString("MM/dd/yyyy") == "01/01/0001" ? defaultStartDate : ffr.IEPeriodStartA.ToString("MM/dd/yyyy");
            txtIEPeriodEndA.Text = ffr.IEPeriodEndA.ToString("MM/dd/yyyy") == "01/01/0001" ? defaultEndDate : ffr.IEPeriodEndA.ToString("MM/dd/yyyy");

            txtIEBaseA.Text = ffr.ReportStatus == "Draft" ? ffr.IEBaseA.ToString() : ffr.IEBaseA.ToString("N2");
            txtIEAmtChargedA.Text = ffr.ReportStatus == "Draft" ? ffr.IEAmtChargedA.ToString() : ffr.IEAmtChargedA.ToString("N2");
            txtIEFedShareA.Text = ffr.ReportStatus == "Draft" ? ffr.IEFedShareA.ToString() : ffr.IEFedShareA.ToString("N2");
            txtIETypeB.Text = ffr.IETypeB;
            txtIERateB.Text = ffr.IERateB;

            //txtIEPeriodStartB.Text = ffr.IEPeriodStartB.ToString("MM/dd/yyyy");
            //txtIEPeriodEndB.Text = ffr.IEPeriodEndB.ToString("MM/dd/yyyy");
            txtIEPeriodStartB.Text = ffr.IEPeriodStartB.ToString("MM/dd/yyyy") == "01/01/0001" ? defaultStartDate : ffr.IEPeriodStartB.ToString("MM/dd/yyyy");
            txtIEPeriodEndB.Text = ffr.IEPeriodEndB.ToString("MM/dd/yyyy") == "01/01/0001" ? defaultEndDate : ffr.IEPeriodEndB.ToString("MM/dd/yyyy");

            txtIEBaseB.Text = ffr.ReportStatus == "Draft" ? ffr.IEBaseB.ToString() : ffr.IEBaseB.ToString("N2");
            txtIEAmtChargedB.Text = ffr.ReportStatus == "Draft" ? ffr.IEAmtChargedB.ToString() : ffr.IEAmtChargedB.ToString("N2");
            txtIEFedShareB.Text = ffr.ReportStatus == "Draft" ? ffr.IEFedShareB.ToString() : ffr.IEFedShareB.ToString("N2");

            txtIEBaseTotal.Text = ffr.IEBaseTotal.ToString("N2");
            txtIEAmtChargedTotal.Text = ffr.IEAmtChargedTotal.ToString("N2");
            txtIEFedShareTotal.Text = ffr.IEFedShareTotal.ToString("N2");

            txtRemarks.Text = ffr.Remarks;
            txtOfficalName.Text = ffr.ChiefOfficerName;
            txtOfficialTitle.Text = ffr.ChiefOfficerTitle;
            txtOfficialSignature.Text = ffr.ChiefOfficerSignature;
            txtOfficialPhone.Text = ffr.ChiefOfficerPhone;
            txtOfficialEmail.Text = ffr.ChiefOfficerEmail;
            txtReportStatus.Text = ffr.ReportStatus;
            //txtDateSubmit.Text = ffr.DateReportSubmitted.ToString("MM/dd/yyyy");
            txtDateSubmit.Text = ffr.DateReportSubmitted.ToString("MM/dd/yyyy") == "01/01/0001" ? "" : ffr.DateReportSubmitted.ToString("MM/dd/yyyy");
            txtComments.Text = ffr.Comments;
        }

        protected void ddlFY_SelectedIndexChanged(object sender, EventArgs e)
        {
            SelectedFY = slaa.GetSpecificFiscalYear(int.Parse(ddlFY.SelectedValue)).FiscalYearId;
            IMLS.SPR.Core.DTO.FFR ffr = slaa.GetFFR(SelectedFY);
            BuildFFR(ffr);
        }

        protected void ddlVersion_SelectedIndexChanged(object sender, EventArgs e)
        {
            IMLS.SPR.Core.DTO.FFR ffr = slaa.GetFFR(SelectedFY, int.Parse(ddlVersion.SelectedValue));
            BuildFFR(ffr);
        }

        private void Save()
        {
            IMLS.SPR.Core.DTO.FFR ffr = new Core.DTO.FFR();

            ffr.FFRid = Int32.Parse(lblId.Text);
            ffr.FederalAgency = txtFederalAgency.Text;
            ffr.FederalGrantNum = txtFederalGrantNum.Text;
            ffr.RecipientOrg = txtRecipientOrg.Text;
            ffr.AgencyDUNS = txtAgencyDUNS.Text;
            ffr.AgencyEIN = txtAgencyEIN.Text;
            ffr.RecipientAccountNum = txtRecipientAccountNum.Text;

            if (rbQuaterly.Checked == true)
            {
                ffr.ReportType = "quarterly";
            }
            else if (rbSemiAnnual.Checked == true)
            {
                ffr.ReportType = "semiannual";
            }
            else if (rbAnnual.Checked == true)
            {
                ffr.ReportType = "annual";
            }
            else
            {
                ffr.ReportType = "final";
            }

            if (rbCash.Checked == true)
            {
                ffr.ReportBasis = "cash";
            }
            else
            {
                ffr.ReportBasis = "accrual";
            }

            if (txtGrantStartDate.Text.Trim() == "" || txtGrantStartDate.Text == "01/01/0001") ffr.GrantStartDate = DateTime.ParseExact("01/01/0001", "MM/dd/yyyy", System.Globalization.CultureInfo.InvariantCulture);
            else ffr.GrantStartDate = DateTime.Parse(txtGrantStartDate.Text);
            if (txtGrantEndDate.Text.Trim() == "" || txtGrantEndDate.Text == "01/01/0001") ffr.GrantEndDate = DateTime.ParseExact("01/01/0001", "MM/dd/yyyy", System.Globalization.CultureInfo.InvariantCulture);
            else ffr.GrantEndDate = DateTime.Parse(txtGrantEndDate.Text);
            if (txtReportEndDate.Text.Trim() == "" || txtReportEndDate.Text == "01/01/0001") ffr.ReportEndDate = DateTime.ParseExact("01/01/0001", "MM/dd/yyyy", System.Globalization.CultureInfo.InvariantCulture);
            else ffr.ReportEndDate = DateTime.Parse(txtReportEndDate.Text);

            ffr.FedCashReceipts = Decimal.Parse(txtFedCashReceipts.Text);
            ffr.FedCashDisburse = Decimal.Parse(txtFedCashDisburse.Text);
            ffr.FedCashOnHand = Decimal.Parse(txtFedCashOnHand.Text);
            ffr.FETotalAuthorized = Decimal.Parse(txtFETotalAuthorized.Text);
            ffr.FEExpenditures = Decimal.Parse(txtFEExpenditures.Text);
            ffr.FEUnliquidatedObl = Decimal.Parse(txtFEUnliquidatedObl.Text);
            ffr.FETotal = Decimal.Parse(txtFETotal.Text);
            ffr.FEUnobligatedBalance = Decimal.Parse(txtFEUnobligatedBalance.Text);
            ffr.RSTotalReq = Decimal.Parse(txtRSTotalReq.Text);
            ffr.RSExpenditures = Decimal.Parse(txtRSExpenditures.Text);
            ffr.RSProvided = Decimal.Parse(txtRSProvided.Text);
            ffr.PITotalIncome = Decimal.Parse(txtPITotalIncome.Text);
            ffr.PIDeductionAlt = Decimal.Parse(txtPIDeductionAlt.Text);
            ffr.PIAdditionAlt = Decimal.Parse(txtPIAdditionAlt.Text);
            ffr.PIUnexpendedIncome = Decimal.Parse(txtPIUnexpendedIncome.Text);

            ffr.IETypeA = txtIETypeA.Text;
            ffr.IERateA = txtIERateA.Text;
            if (txtIEPeriodStartA.Text.Trim() == "" || txtIEPeriodStartA.Text == "01/01/0001") ffr.IEPeriodStartA = DateTime.ParseExact("01/01/0001", "MM/dd/yyyy", System.Globalization.CultureInfo.InvariantCulture);
            else ffr.IEPeriodStartA = DateTime.Parse(txtIEPeriodStartA.Text);
            if (txtIEPeriodEndA.Text.Trim() == "" || txtIEPeriodEndA.Text == "01/01/0001") ffr.IEPeriodEndA = DateTime.ParseExact("01/01/0001", "MM/dd/yyyy", System.Globalization.CultureInfo.InvariantCulture);
            else ffr.IEPeriodEndA = DateTime.Parse(txtIEPeriodEndA.Text);
            ffr.IEBaseA = Decimal.Parse(txtIEBaseA.Text);
            ffr.IEAmtChargedA = Decimal.Parse(txtIEAmtChargedA.Text);
            ffr.IEFedShareA = Decimal.Parse(txtIEFedShareA.Text);

            ffr.IETypeB = txtIETypeB.Text;
            ffr.IERateB = txtIERateB.Text;
            if (txtIEPeriodStartB.Text.Trim() == "" || txtIEPeriodStartB.Text == "01/01/0001") ffr.IEPeriodStartB = DateTime.ParseExact("01/01/0001", "MM/dd/yyyy", System.Globalization.CultureInfo.InvariantCulture);
            else ffr.IEPeriodStartB = DateTime.Parse(txtIEPeriodStartB.Text);
            if (txtIEPeriodEndB.Text.Trim() == "" || txtIEPeriodEndB.Text == "01/01/0001") ffr.IEPeriodEndB = DateTime.ParseExact("01/01/0001", "MM/dd/yyyy", System.Globalization.CultureInfo.InvariantCulture);
            else ffr.IEPeriodEndB = DateTime.Parse(txtIEPeriodEndB.Text);
            ffr.IEBaseB = Decimal.Parse(txtIEBaseB.Text);
            ffr.IEAmtChargedB = Decimal.Parse(txtIEAmtChargedB.Text);
            ffr.IEFedShareB = Decimal.Parse(txtIEFedShareB.Text);

            ffr.IEBaseTotal = Decimal.Parse(txtIEBaseTotal.Text);
            ffr.IEAmtChargedTotal = Decimal.Parse(txtIEAmtChargedTotal.Text);
            ffr.IEFedShareTotal = Decimal.Parse(txtIEFedShareTotal.Text);
            
            ffr.Remarks = txtRemarks.Text;
            //ffr.ChiefOfficerName = txtOfficalName.Text;
            //ffr.ChiefOfficerTitle = txtOfficialTitle.Text;
            //ffr.ChiefOfficerSignature = txtOfficialSignature.Text;
            //ffr.ChiefOfficerPhone = txtOfficialPhone.Text;
            //ffr.ChiefOfficerEmail = txtOfficialEmail.Text;
            ffr.ReportStatus = "Draft";
            //if (txtDateSubmit.Text.Trim() == "" || txtDateSubmit.Text == "01/01/0001") ffr.DateReportSubmitted = DateTime.ParseExact("01/01/0001", "MM/dd/yyyy", System.Globalization.CultureInfo.InvariantCulture);
            //else ffr.txtDateSubmit = DateTime.Parse(txtDateSubmit.Text);
            ffr.Comments = txtComments.Text;

            slaa.EditFFR(ffr);
        }

        protected void btnUpdate_Click(object sender, EventArgs e)
        {
            Save();
            Response.Redirect("/SLAA");
        }

        protected void btnCancel_Click(object sender, EventArgs e)
        {
            Response.Redirect("/SLAA");
        }

        protected void btnPrint_Click(object sender, EventArgs e)
        {
            Response.Redirect("/SLAA/Federal/Print/" + ddlFY.SelectedValue.ToString() + "/" + ddlVersion.SelectedValue.ToString());
        }

        protected void btnCertify_Click(object sender, EventArgs e)
        {
            Save();
            int FFRid = Int32.Parse(lblId.Text);
            slaa.CertifyFFR(FFRid);
            Response.Redirect("/SLAA");
        }
    }
}