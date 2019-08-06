/* 
	Portal Widget Server Side Script for Headcount and Financial Management
	Authored by: Ashley Pressley
	Updated: 09/07/2018
	Description: Assimilates, calculates, displays, and stores
	  financial and headcount data on a per region and per 
	  designated company basis across a multitude of tables.
	  Originally based off of an antiquated Excel spreadsheet.
*/

(function() {
	data.summaryTable = 'u_demo_summary';
	data.headcountTable = 'u_demo_headcount_summary';
	data.productivityTable = 'u_demo_productivity';
	data.read_only = options.read_only || "false";
	data.hcNum = 'false';
	data.hcCost = 'true';

	if (!input) {
		data.working = 'System Default';
		// Summary Table Tab
		var grDemoSummary = new GlideRecord(data.summaryTable);
		grDemoSummary.addQuery('u_active', true);
		grDemoSummary.query();
		
		if (grDemoSummary.next()) {
			data.revenue2018 = parseFloat(grDemoSummary.getValue('u_2018'));
			data.wfCurrent = parseFloat(grDemoSummary.getValue('u_current_wf'));
			data.distributionCss = parseFloat(grDemoSummary.getValue('u_distribution_css'));
			data.distributionDepuy = parseFloat(grDemoSummary.getValue('u_distribution_depuy'));
			data.distributionEth = parseFloat(grDemoSummary.getValue('u_distribution_ethicon'));
			data.opex2018 = parseFloat(grDemoSummary.getValue('u_opex_2018'));
			data.opexInc = parseFloat(grDemoSummary.getValue('u_opex_inc'));
			data.region = grDemoSummary.u_region.getUniqueValue();
			data.revenueGrowth2019 = parseFloat(grDemoSummary.getValue('u_rev_growth_2019'));
			data.revenueGrowth2020 = parseFloat(grDemoSummary.getValue('u_rev_growth_2020'));
			data.revenueGrowth2021 = parseFloat(grDemoSummary.getValue('u_rev_growth_2021'));
			data.revenueGrowth2022 = parseFloat(grDemoSummary.getValue('u_rev_growth_2022'));
			data.sys_id = grDemoSummary.getUniqueValue();
			
			// Now to calculate other data values
			data.revenue2019 = data.revenue2018 * (1 + data.revenueGrowth2019 / 100);
			data.revenue2020 = data.revenue2019 * (1 + data.revenueGrowth2020 / 100);
			data.revenue2021 = data.revenue2020 * (1 + data.revenueGrowth2021 / 100);
			data.revenue2022 = data.revenue2021 * (1 + data.revenueGrowth2022 / 100);

			data.revenueCss2018 = data.revenue2018 * data.distributionCss / 100;
			data.revenueDepuy2018 = data.revenue2018 * data.distributionDepuy / 100;
			data.revenueEth2018 = data.revenue2018 * data.distributionEth / 100;

			data.revenueCss2019 = data.revenue2019 * data.distributionCss / 100;
			data.revenueDepuy2019 = data.revenue2019 * data.distributionDepuy / 100;
			data.revenueEth2019 = data.revenue2019 * data.distributionEth / 100;
			data.revenueOps2019 = data.revenue2019 - data.revenue2018;
			data.revenueGov2019 = data.revenue2019 - data.revenue2018;
			data.revenueCorp2019 = data.revenue2019 - data.revenue2018;

			data.revenueCss2020 = data.revenue2020 * data.distributionCss / 100;
			data.revenueDepuy2020 = data.revenue2020 * data.distributionDepuy / 100;
			data.revenueEth2020 = data.revenue2020 * data.distributionEth / 100;
			data.revenueOps2020 = data.revenue2020 - data.revenue2019;
			data.revenueGov2020 = data.revenue2020 - data.revenue2019;
			data.revenueCorp2020 = data.revenue2020 - data.revenue2019;

			data.revenueCss2021 = data.revenue2021 * data.distributionCss / 100;
			data.revenueDepuy2021 = data.revenue2021 * data.distributionDepuy / 100;
			data.revenueEth2021 = data.revenue2021 * data.distributionEth / 100;
			data.revenueOps2021 = data.revenue2021 - data.revenue2020;
			data.revenueGov2021 = data.revenue2021 - data.revenue2020;
			data.revenueCorp2021 = data.revenue2021 - data.revenue2020;

			data.revenueCss2022 = data.revenue2022 * data.distributionCss / 100;
			data.revenueDepuy2022 = data.revenue2022 * data.distributionDepuy / 100;
			data.revenueEth2022 = data.revenue2022 * data.distributionEth / 100;
			data.revenueOps2022 = data.revenue2022 - data.revenue2021;
			data.revenueGov2022 = data.revenue2022 - data.revenue2021;
			data.revenueCorp2022 = data.revenue2022 - data.revenue2021;

			data.opex2019 = data.opex2018 * (1 + data.opexInc / 100);
			data.opex2020 = data.opex2019 * (1 + data.opexInc / 100);
			data.opex2021 = data.opex2020 * (1 + data.opexInc / 100);
			data.opex2022 = data.opex2021 * (1 + data.opexInc / 100);

			data.opexN2018 = data.revenue2018 * data.opex2018 * 10;
			data.opexN2019 = data.revenue2019 * data.opex2019 * 10;
			data.opexN2020 = data.revenue2020 * data.opex2020 * 10;
			data.opexN2021 = data.revenue2021 * data.opex2021 * 10;
			data.opexN2022 = data.revenue2022 * data.opex2022 * 10;

			data.addWF2018 = 0;
			data.addWF2019 = 0;
			data.addWF2020 = 0;
			data.addWF2021 = 0;
		}

		// ** Ethicon Summary Table Tab **
		data.ethPosition = [];
		data.ethicon = [];
		data.ethiconWF2018 = 0;
		data.ethiconWF2019 = 0;
		data.ethiconWF2020 = 0;
		data.ethiconWF2021 = 0;
		data.ethhc2018 = 0;
		data.ethhc2019 = 0;
		data.ethhc2020 = 0;
		data.ethhc2021 = 0;
		data.ethhcactual = 0;

		data.ethiconRevGrowth2019 = (data.revenueEth2019 - data.revenueEth2018) * 1000;
		data.ethiconRevGrowth2020 = (data.revenueEth2020 - data.revenueEth2019) * 1000;
		data.ethiconRevGrowth2021 = (data.revenueEth2021 - data.revenueEth2020) * 1000;
		data.ethiconRevGrowth2022 = (data.revenueEth2022 - data.revenueEth2021) * 1000;

		var grEthProductivity = new GlideRecord(data.productivityTable);
		grEthProductivity.addQuery('u_active', true);
		grEthProductivity.addQuery('u_franchise.u_name', 'Ethicon');
		grEthProductivity.addQuery('u_number','STARTSWITH', 'PRO');
		grEthProductivity.query();
		
		while (grEthProductivity.next()) {
			data.ethPosition.push({
				'sys_id': grEthProductivity.getUniqueValue(),
				'category': grEthProductivity.getDisplayValue('u_category'),
				'prod100': parseFloat(grEthProductivity.getValue('u_100prod')),
				'prod85': (parseFloat(grEthProductivity.getValue('u_100prod')) * 0.85)
			});
		}

		var grEthSummaryPosition = new GlideRecord(data.headcountTable);
		grEthSummaryPosition.addQuery('u_active', true);
		grEthSummaryPosition.addQuery('u_franchise.u_name', 'Ethicon');
		grEthSummaryPosition.query();
		
		while (grEthSummaryPosition.next()) {
			data.ethicon.push({
				'sys_id': grEthSummaryPosition.getUniqueValue(),
				'position': grEthSummaryPosition.u_position.u_display.toString(),
				'sub_function': grEthSummaryPosition.u_position.u_job_sub_function.toString(),
				'commissions': grEthSummaryPosition.u_position.u_commissions.toString(),
				'cost': parseFloat(grEthSummaryPosition.getValue('u_avg_cost')),
				'rev_percent': parseFloat(grEthSummaryPosition.getValue('u_percent_rev')),
				'avg_quota': parseFloat(grEthSummaryPosition.getValue('u_total_avg_quota')),
				'distribution': parseFloat(grEthSummaryPosition.getValue('u_distribution')),
				'hctotal': parseInt(grEthSummaryPosition.getValue('u_current_headcount')),
				'tcost': parseInt(grEthSummaryPosition.getValue('u_current_headcount')) * parseFloat(grEthSummaryPosition.getValue('u_avg_cost'))
			});
		}

		if (data.ethicon.length > 0) {
			for (var i = 0; i < data.ethicon.length; i++) {
				if (data.ethicon[i].sub_function == 'Selling MD&D' && data.ethicon[i].commissions == 'true') {
					data.ethicon[i].hc2018 = Math.round(((data.ethiconRevGrowth2019 * (data.ethicon[i].rev_percent)) / data.ethicon[i].avg_quota) * 1.15);
					data.ethicon[i].hc2019 = Math.round(((data.ethiconRevGrowth2020 * (data.ethicon[i].rev_percent)) / data.ethicon[i].avg_quota) * 1.15);
					data.ethicon[i].hc2020 = Math.round(((data.ethiconRevGrowth2021 * (data.ethicon[i].rev_percent)) / data.ethicon[i].avg_quota) * 1.15);
					data.ethicon[i].hc2021 = Math.round(((data.ethiconRevGrowth2022 * (data.ethicon[i].rev_percent)) / data.ethicon[i].avg_quota) * 1.15);

					if (!isNaN(data.ethicon[i].distribution) && !(data.ethicon[i].distribution == null) && !(data.ethicon[i].distribution == 'null')) {
						data.ethicon[i].hc2018 = Math.round(data.ethicon[i].hc2018 * data.ethicon[i].distribution);
						data.ethicon[i].hc2019 = Math.round(data.ethicon[i].hc2019 * data.ethicon[i].distribution);
						data.ethicon[i].hc2020 = Math.round(data.ethicon[i].hc2020 * data.ethicon[i].distribution);
						data.ethicon[i].hc2021 = Math.round(data.ethicon[i].hc2021 * data.ethicon[i].distribution);
					}
				}
				else {
					var subfunction = data.ethicon[i].sub_function;
					var prod85 = parseFloat(CallbackToFindPositionProduction(data.ethPosition, subfunction));

					data.ethicon[i].hc2018 = Math.round((data.ethiconRevGrowth2019 / (prod85 * 1000)) * data.ethicon[i].distribution);
					data.ethicon[i].hc2019 = Math.round((data.ethiconRevGrowth2020 / (prod85 * 1000)) * data.ethicon[i].distribution);
					data.ethicon[i].hc2020 = Math.round((data.ethiconRevGrowth2021 / (prod85 * 1000)) * data.ethicon[i].distribution);
					data.ethicon[i].hc2021 = Math.round((data.ethiconRevGrowth2022 / (prod85 * 1000)) * data.ethicon[i].distribution);
				}

				data.ethhcactual += data.ethicon[i].hctotal;
				data.ethhc2018 += data.ethicon[i].hc2018;
				data.ethhc2019 += data.ethicon[i].hc2019;
				data.ethhc2020 += data.ethicon[i].hc2020;
				data.ethhc2021 += data.ethicon[i].hc2021;

				data.ethicon[i].hcCost2018 = data.ethicon[i].cost * data.ethicon[i].hc2018;
				data.ethicon[i].hcCost2019 = data.ethicon[i].cost * data.ethicon[i].hc2019;
				data.ethicon[i].hcCost2020 = data.ethicon[i].cost * data.ethicon[i].hc2020;
				data.ethicon[i].hcCost2021 = data.ethicon[i].cost * data.ethicon[i].hc2021;

				data.ethiconWF2018 += data.ethicon[i].hcCost2018;
				data.ethiconWF2019 += data.ethicon[i].hcCost2019;
				data.ethiconWF2020 += data.ethicon[i].hcCost2020;
				data.ethiconWF2021 += data.ethicon[i].hcCost2021;
			}

			data.ethhc2018 += data.ethhcactual;
			data.ethhc2019 += data.ethhc2018;
			data.ethhc2020 += data.ethhc2019;
			data.ethhc2021 += data.ethhc2020;
		}

		// ** DPS Summary Table Tab **
		data.dpsPosition = [];
		data.dps = [];
		data.dpsWF2018 = 0;
		data.dpsWF2019 = 0;
		data.dpsWF2020 = 0;
		data.dpsWF2021 = 0;
		data.dpshc2018 = 0;
		data.dpshc2019 = 0;
		data.dpshc2020 = 0;
		data.dpshc2021 = 0;
		data.dpshcactual = 0;

		data.dpsRevGrowth2019 = (data.revenueDepuy2019 - data.revenueDepuy2018);
		data.dpsRevGrowth2020 = (data.revenueDepuy2020 - data.revenueDepuy2019);
		data.dpsRevGrowth2021 = (data.revenueDepuy2021 - data.revenueDepuy2020);
		data.dpsRevGrowth2022 = (data.revenueDepuy2022 - data.revenueDepuy2021);

		var grDPSProductivity = new GlideRecord(data.productivityTable);
		grDPSProductivity.addQuery('u_active', true);
		grDPSProductivity.addQuery('u_franchise.u_name', 'DePuy Synthes');
		grDPSProductivity.addQuery('u_number','STARTSWITH', 'PRO');
		grDPSProductivity.query();
		
		while (grDPSProductivity.next()) {
			data.dpsPosition.push({
				'sys_id': grDPSProductivity.getUniqueValue(),
				'category': grDPSProductivity.getDisplayValue('u_category'),
				'prod100': parseFloat(grDPSProductivity.getValue('u_100prod')),
				'prod85': (parseFloat(grDPSProductivity.getValue('u_100prod')) * 0.85)
			});
		}

		var grDPSSummaryPosition = new GlideRecord(data.headcountTable);
		grDPSSummaryPosition.addQuery('u_active', true);
		grDPSSummaryPosition.addQuery('u_franchise.u_name', 'DePuy Synthes');
		grDPSSummaryPosition.query();
		
		while (grDPSSummaryPosition.next()) {
			data.dps.push({
				'sys_id': grDPSSummaryPosition.getUniqueValue(),
				'position': grDPSSummaryPosition.getDisplayValue('u_position'),
				'sub_function': grDPSSummaryPosition.u_position.u_job_sub_function.toString(),
				'commissions': grDPSSummaryPosition.u_position.u_commissions.toString(),
				'cost': parseFloat(grDPSSummaryPosition.getValue('u_avg_cost')),
				'rev_percent': parseFloat(grDPSSummaryPosition.getValue('u_percent_rev')),
				'avg_quota': parseFloat(grDPSSummaryPosition.getValue('u_total_avg_quota')),
				'distribution': parseFloat(grDPSSummaryPosition.getValue('u_distribution')),
				'hctotal': parseInt(grDPSSummaryPosition.getValue('u_current_headcount')),
				'tcost': parseInt(grDPSSummaryPosition.getValue('u_current_headcount')) * parseFloat(grDPSSummaryPosition.getValue('u_avg_cost'))
			});
		}

		if (data.dps.length > 0) {
			for (var i = 0; i < data.dps.length; i++) {
				if (data.dps[i].sub_function == 'Selling MD&D' && data.dps[i].commissions == 'true') {
					data.dps[i].hc2018 = Math.round(((data.dpsRevGrowth2019 * (data.dps[i].rev_percent)) / data.dps[i].avg_quota));
					data.dps[i].hc2019 = Math.round(((data.dpsRevGrowth2020 * (data.dps[i].rev_percent)) / data.dps[i].avg_quota));
					data.dps[i].hc2020 = Math.round(((data.dpsRevGrowth2021 * (data.dps[i].rev_percent)) / data.dps[i].avg_quota));
					data.dps[i].hc2021 = Math.round(((data.dpsRevGrowth2022 * (data.dps[i].rev_percent)) / data.dps[i].avg_quota));

					if (!isNaN(data.dps[i].distribution) && !(data.dps[i].distribution == null) && !(data.dps[i].distribution == 'null')) {
						data.dps[i].hc2018 = Math.round(data.dps[i].hc2018 * data.dps[i].distribution);
						data.dps[i].hc2019 = Math.round(data.dps[i].hc2019 * data.dps[i].distribution);
						data.dps[i].hc2020 = Math.round(data.dps[i].hc2020 * data.dps[i].distribution);
						data.dps[i].hc2021 = Math.round(data.dps[i].hc2021 * data.dps[i].distribution);
					}
				}
				else if (data.dps[i].distribution == 0) {
					data.dps[i].hc2018 = 0;
					data.dps[i].hc2019 = 0;
					data.dps[i].hc2020 = 0;
					data.dps[i].hc2021 = 0;
				}
				else {
					var subfunction = data.dps[i].sub_function;
					var prod85 = parseFloat(CallbackToFindPositionProduction(data.dpsPosition, subfunction));

					data.dps[i].hc2018 = Math.round((data.dpsRevGrowth2019 / (prod85)) * data.dps[i].distribution);
					data.dps[i].hc2019 = Math.round((data.dpsRevGrowth2020 / (prod85)) * data.dps[i].distribution);
					data.dps[i].hc2020 = Math.round((data.dpsRevGrowth2021 / (prod85)) * data.dps[i].distribution);
					data.dps[i].hc2021 = Math.round((data.dpsRevGrowth2022 / (prod85)) * data.dps[i].distribution);
				}

				data.dpshcactual += data.dps[i].hctotal;
				data.dpshc2018 += data.dps[i].hc2018;
				data.dpshc2019 += data.dps[i].hc2019;
				data.dpshc2020 += data.dps[i].hc2020;
				data.dpshc2021 += data.dps[i].hc2021;

				data.dps[i].hcCost2018 = data.dps[i].cost * data.dps[i].hc2018;
				data.dps[i].hcCost2019 = data.dps[i].cost * data.dps[i].hc2019;
				data.dps[i].hcCost2020 = data.dps[i].cost * data.dps[i].hc2020;
				data.dps[i].hcCost2021 = data.dps[i].cost * data.dps[i].hc2021;

				data.dpsWF2018 += data.dps[i].hcCost2018;
				data.dpsWF2019 += data.dps[i].hcCost2019;
				data.dpsWF2020 += data.dps[i].hcCost2020;
				data.dpsWF2021 += data.dps[i].hcCost2021;
			}

			data.dpshc2018 += data.dpshcactual;
			data.dpshc2019 += data.dpshc2018;
			data.dpshc2020 += data.dpshc2019;
			data.dpshc2021 += data.dpshc2020;
		}

		// ** CSS Summary Table Tab **
		data.cssPosition = [];
		data.css = [];
		data.cssWF2018 = 0;
		data.cssWF2019 = 0;
		data.cssWF2020 = 0;
		data.cssWF2021 = 0;
		data.csshc2018 = 0;
		data.csshc2019 = 0;
		data.csshc2020 = 0;
		data.csshc2021 = 0;
		data.csshcactual = 0;

		data.cssRevGrowth2019 = (data.revenueCss2019 - data.revenueCss2018);
		data.cssRevGrowth2020 = (data.revenueCss2020 - data.revenueCss2019);
		data.cssRevGrowth2021 = (data.revenueCss2021 - data.revenueCss2020);
		data.cssRevGrowth2022 = (data.revenueCss2022 - data.revenueCss2021);

		var grCSSProductivity = new GlideRecord(data.productivityTable);
		grCSSProductivity.addQuery('u_active', true);
		grCSSProductivity.addQuery('u_franchise.u_name', 'CSS');
		grCSSProductivity.addQuery('u_number','STARTSWITH', 'PRO');
		grCSSProductivity.query();
		
		while (grCSSProductivity.next()) {
			data.cssPosition.push({
				'sys_id': grCSSProductivity.getUniqueValue(),
				'category': grCSSProductivity.getDisplayValue('u_category'),
				'prod100': parseFloat(grCSSProductivity.getValue('u_100prod')),
				'prod85': (parseFloat(grCSSProductivity.getValue('u_100prod')) * 0.85)
			});
		}

		var grCSSSummaryPosition = new GlideRecord(data.headcountTable);
		grCSSSummaryPosition.addQuery('u_active', true);
		grCSSSummaryPosition.addQuery('u_franchise.u_name', 'CSS');
		grCSSSummaryPosition.query();
		
		while (grCSSSummaryPosition.next()) {
			data.css.push({
				'sys_id': grCSSSummaryPosition.getUniqueValue(),
				'position': grCSSSummaryPosition.getDisplayValue('u_position'),
				'sub_function': grCSSSummaryPosition.u_position.u_job_sub_function.toString(),
				'commissions': grCSSSummaryPosition.u_position.u_commissions.toString(),
				'cost': parseFloat(grCSSSummaryPosition.getValue('u_avg_cost')),
				'rev_percent': parseFloat(grCSSSummaryPosition.getValue('u_percent_rev')),
				'avg_quota': parseFloat(grCSSSummaryPosition.getValue('u_total_avg_quota')),
				'distribution': parseFloat(grCSSSummaryPosition.getValue('u_distribution')),
				'hctotal': parseInt(grCSSSummaryPosition.getValue('u_current_headcount')),
				'tcost': parseInt(grCSSSummaryPosition.getValue('u_current_headcount')) * parseFloat(grCSSSummaryPosition.getValue('u_avg_cost'))
			});
		}

		if (data.css.length > 0) {
			for (var i = 0; i < data.css.length; i++) {
				if (data.css[i].sub_function == 'Selling MD&D' && data.css[i].commissions == 'true') {
					data.css[i].hc2018 = Math.round(((data.cssRevGrowth2019 * (data.css[i].rev_percent)) / data.css[i].avg_quota));
					data.css[i].hc2019 = Math.round(((data.cssRevGrowth2020 * (data.css[i].rev_percent)) / data.css[i].avg_quota));
					data.css[i].hc2020 = Math.round(((data.cssRevGrowth2021 * (data.css[i].rev_percent)) / data.css[i].avg_quota));
					data.css[i].hc2021 = Math.round(((data.cssRevGrowth2022 * (data.css[i].rev_percent)) / data.css[i].avg_quota));

					if (!isNaN(data.css[i].distribution)) {
						data.css[i].hc2018 = Math.round(data.css[i].hc2018 * data.css[i].distribution);
						data.css[i].hc2019 = Math.round(data.css[i].hc2019 * data.css[i].distribution);
						data.css[i].hc2020 = Math.round(data.css[i].hc2020 * data.css[i].distribution);
						data.css[i].hc2021 = Math.round(data.css[i].hc2021 * data.css[i].distribution);
					}
				}
				else if (data.css[i].distribution == 0) {
					data.css[i].hc2018 = 0;
					data.css[i].hc2019 = 0;
					data.css[i].hc2020 = 0;
					data.css[i].hc2021 = 0;
				}
				else {
					var subfunction = data.css[i].sub_function;
					var prod85 = parseFloat(CallbackToFindPositionProduction(data.cssPosition, subfunction));

					data.css[i].hc2018 = Math.round((data.cssRevGrowth2019 * 1000 / (prod85)) * data.css[i].distribution);
					data.css[i].hc2019 = Math.round((data.cssRevGrowth2020 * 1000 / (prod85)) * data.css[i].distribution);
					data.css[i].hc2020 = Math.round((data.cssRevGrowth2021 * 1000 / (prod85)) * data.css[i].distribution);
					data.css[i].hc2021 = Math.round((data.cssRevGrowth2022 * 1000 / (prod85)) * data.css[i].distribution);
				}

				data.csshcactual += data.css[i].hctotal;
				data.csshc2018 += data.css[i].hc2018;
				data.csshc2019 += data.css[i].hc2019;
				data.csshc2020 += data.css[i].hc2020;
				data.csshc2021 += data.css[i].hc2021;

				data.css[i].hcCost2018 = data.css[i].cost * data.css[i].hc2018;
				data.css[i].hcCost2019 = data.css[i].cost * data.css[i].hc2019;
				data.css[i].hcCost2020 = data.css[i].cost * data.css[i].hc2020;
				data.css[i].hcCost2021 = data.css[i].cost * data.css[i].hc2021;

				data.cssWF2018 += data.css[i].hcCost2018;
				data.cssWF2019 += data.css[i].hcCost2019;
				data.cssWF2020 += data.css[i].hcCost2020;
				data.cssWF2021 += data.css[i].hcCost2021;
			}

			data.csshc2018 += data.csshcactual;
			data.csshc2019 += data.csshc2018;
			data.csshc2020 += data.csshc2019;
			data.csshc2021 += data.csshc2020;
		}

		// ** Ops & Ed Summary Table Tab **
		data.opsPosition = [];
		data.ops = [];
		data.opsWF2018 = 0;
		data.opsWF2019 = 0;
		data.opsWF2020 = 0;
		data.opsWF2021 = 0;
		data.opshc2018 = 0;
		data.opshc2019 = 0;
		data.opshc2020 = 0;
		data.opshc2021 = 0;
		data.opshcactual = 0;

		data.opsRevGrowth2019 = data.revenueOps2019;
		data.opsRevGrowth2020 = data.revenueOps2020;
		data.opsRevGrowth2021 = data.revenueOps2021;
		data.opsRevGrowth2022 = data.revenueOps2022;

		var grOpsProductivity = new GlideRecord(data.productivityTable);
		grOpsProductivity.addQuery('u_active', true);
		grOpsProductivity.addQuery('u_franchise.u_name', 'Operations and Education Solution');
		grOpsProductivity.addQuery('u_number','STARTSWITH', 'PRO');
		grOpsProductivity.query();
		
		while (grOpsProductivity.next()) {
			data.opsPosition.push({
				'sys_id': grOpsProductivity.getUniqueValue(),
				'category': grOpsProductivity.getDisplayValue('u_category'),
				'prod100': parseFloat(grOpsProductivity.getValue('u_100prod')),
				'prod85': (parseFloat(grOpsProductivity.getValue('u_100prod')) * 0.85)
			});
		}

		var grOPSSummaryPosition = new GlideRecord(data.headcountTable);
		grOPSSummaryPosition.addQuery('u_active', true);
		grOPSSummaryPosition.addQuery('u_franchise.u_name', 'Operations and Education Solution');
		grOPSSummaryPosition.query();
		
		while (grOPSSummaryPosition.next()) {
			data.ops.push({
				'sys_id': grOPSSummaryPosition.getUniqueValue(),
				'position': grOPSSummaryPosition.getDisplayValue('u_position'),
				'sub_function': grOPSSummaryPosition.u_position.u_job_sub_function.toString(),
				'commissions': grOPSSummaryPosition.u_position.u_commissions.toString(),
				'cost': parseFloat(grOPSSummaryPosition.getValue('u_avg_cost')),
				'distribution': parseFloat(grOPSSummaryPosition.getValue('u_distribution')),
				'hctotal': parseInt(grOPSSummaryPosition.getValue('u_current_headcount')),
				'tcost': parseInt(grOPSSummaryPosition.getValue('u_current_headcount')) * parseFloat(grOPSSummaryPosition.getValue('u_avg_cost'))
			});
		}

		if (data.ops.length > 0) {
			for (var i = 0; i < data.ops.length; i++) {
				var subfunction = data.ops[i].sub_function;
				var prod85 = parseFloat(CallbackToFindPositionProduction(data.opsPosition, subfunction));

				data.ops[i].hc2018 = Math.round(((data.opsRevGrowth2019 * 1000) / prod85) * data.ops[i].distribution);
				data.ops[i].hc2019 = Math.round(((data.opsRevGrowth2020 * 1000) / prod85) * data.ops[i].distribution);
				data.ops[i].hc2020 = Math.round(((data.opsRevGrowth2021 * 1000) / prod85) * data.ops[i].distribution);
				data.ops[i].hc2021 = Math.round(((data.opsRevGrowth2022 * 1000) / prod85) * data.ops[i].distribution);

				data.opshcactual += data.ops[i].hctotal;
				data.opshc2018 += data.ops[i].hc2018;
				data.opshc2019 += data.ops[i].hc2019;
				data.opshc2020 += data.ops[i].hc2020;
				data.opshc2021 += data.ops[i].hc2021;

				data.ops[i].hcCost2018 = data.ops[i].cost * data.ops[i].hc2018;
				data.ops[i].hcCost2019 = data.ops[i].cost * data.ops[i].hc2019;
				data.ops[i].hcCost2020 = data.ops[i].cost * data.ops[i].hc2020;
				data.ops[i].hcCost2021 = data.ops[i].cost * data.ops[i].hc2021;

				data.opsWF2018 += data.ops[i].hcCost2018;
				data.opsWF2019 += data.ops[i].hcCost2019;
				data.opsWF2020 += data.ops[i].hcCost2020;
				data.opsWF2021 += data.ops[i].hcCost2021;
			}

			data.opshc2018 += data.opshcactual;
			data.opshc2019 += data.opshc2018;
			data.opshc2020 += data.opshc2019;
			data.opshc2021 += data.opshc2020;
		}

		// ** Govt Affairs Summary Table Tab **
		data.govPosition = [];
		data.gov = [];
		data.govWF2018 = 0;
		data.govWF2019 = 0;
		data.govWF2020 = 0;
		data.govWF2021 = 0;
		data.govhc2018 = 0;
		data.govhc2019 = 0;
		data.govhc2020 = 0;
		data.govhc2021 = 0;
		data.govhcactual = 0;

		data.govRevGrowth2019 = data.revenueGov2019;
		data.govRevGrowth2020 = data.revenueGov2020;
		data.govRevGrowth2021 = data.revenueGov2021;
		data.govRevGrowth2022 = data.revenueGov2022;

		var grGovProductivity = new GlideRecord(data.productivityTable);
		grGovProductivity.addQuery('u_active', true);
		grGovProductivity.addQuery('u_franchise.u_name', 'Government Affairs');
		grGovProductivity.addQuery('u_number','STARTSWITH', 'PRO');
		grGovProductivity.query();
		
		while (grGovProductivity.next()) {
			data.govPosition.push({
				'sys_id': grGovProductivity.getUniqueValue(),
				'category': grGovProductivity.getDisplayValue('u_category'),
				'prod100': parseFloat(grGovProductivity.getValue('u_100prod')),
				'prod85': (parseFloat(grGovProductivity.getValue('u_100prod')) * 0.85)
			});
		}

		var grGovSummaryPosition = new GlideRecord(data.headcountTable);
		grGovSummaryPosition.addQuery('u_active', true);
		grGovSummaryPosition.addQuery('u_franchise.u_name', 'Government Affairs');
		grGovSummaryPosition.query();
		
		while (grGovSummaryPosition.next()) {
			data.gov.push({
				'sys_id': grGovSummaryPosition.getUniqueValue(),
				'position': grGovSummaryPosition.getDisplayValue('u_position'),
				'sub_function': grGovSummaryPosition.u_position.u_job_sub_function.toString(),
				'commissions': grGovSummaryPosition.u_position.u_commissions.toString(),
				'cost': parseFloat(grGovSummaryPosition.getValue('u_avg_cost')),
				'distribution': parseFloat(grGovSummaryPosition.getValue('u_distribution')),
				'hctotal': parseInt(grGovSummaryPosition.getValue('u_current_headcount')),
				'tcost': parseInt(grGovSummaryPosition.getValue('u_current_headcount')) * parseFloat(grGovSummaryPosition.getValue('u_avg_cost'))
			});
		}

		if (data.gov.length > 0) {
			for (var i = 0; i < data.gov.length; i++) {
				var subfunction = data.gov[i].sub_function;
				var prod85 = parseFloat(CallbackToFindPositionProduction(data.govPosition, subfunction));

				data.gov[i].hc2018 = Math.round(((data.govRevGrowth2019 * 1000) / prod85) * data.gov[i].distribution);
				data.gov[i].hc2019 = Math.round(((data.govRevGrowth2020 * 1000) / prod85) * data.gov[i].distribution);
				data.gov[i].hc2020 = Math.round(((data.govRevGrowth2021 * 1000) / prod85) * data.gov[i].distribution);
				data.gov[i].hc2021 = Math.round(((data.govRevGrowth2022 * 1000) / prod85) * data.gov[i].distribution);

				data.govhcactual += data.gov[i].hctotal;
				data.govhc2018 += data.gov[i].hc2018;
				data.govhc2019 += data.gov[i].hc2019;
				data.govhc2020 += data.gov[i].hc2020;
				data.govhc2021 += data.gov[i].hc2021;

				data.gov[i].hcCost2018 = data.gov[i].cost * data.gov[i].hc2018;
				data.gov[i].hcCost2019 = data.gov[i].cost * data.gov[i].hc2019;
				data.gov[i].hcCost2020 = data.gov[i].cost * data.gov[i].hc2020;
				data.gov[i].hcCost2021 = data.gov[i].cost * data.gov[i].hc2021;

				data.govWF2018 += data.gov[i].hcCost2018;
				data.govWF2019 += data.gov[i].hcCost2019;
				data.govWF2020 += data.gov[i].hcCost2020;
				data.govWF2021 += data.gov[i].hcCost2021;
			}

			data.govhc2018 += data.govhcactual;
			data.govhc2019 += data.govhc2018;
			data.govhc2020 += data.govhc2019;
			data.govhc2021 += data.govhc2020;
		}

		// ** Corp Dev Summary Table Tab **
		data.corpPosition = [];
		data.corp = [];
		data.corpWF2018 = 0;
		data.corpWF2019 = 0;
		data.corpWF2020 = 0;
		data.corpWF2021 = 0;
		data.corphc2018 = 0;
		data.corphc2019 = 0;
		data.corphc2020 = 0;
		data.corphc2021 = 0;
		data.corphcactual = 0;

		data.corpRevGrowth2019 = data.revenueCorp2019;
		data.corpRevGrowth2020 = data.revenueCorp2020;
		data.corpRevGrowth2021 = data.revenueCorp2021;
		data.corpRevGrowth2022 = data.revenueCorp2022;

		var grCorpProductivity = new GlideRecord(data.productivityTable);
		grCorpProductivity.addQuery('u_active', true);
		grCorpProductivity.addQuery('u_franchise.u_name', 'Corporate Development and Business Transformation');
		grCorpProductivity.addQuery('u_number','STARTSWITH', 'PRO');
		grCorpProductivity.query();
		
		while (grCorpProductivity.next()) {
			data.corpPosition.push({
				'sys_id': grCorpProductivity.getUniqueValue(),
				'category': grCorpProductivity.getDisplayValue('u_category'),
				'prod100': parseFloat(grCorpProductivity.getValue('u_100prod')),
				'prod85': (parseFloat(grCorpProductivity.getValue('u_100prod')) * 0.85)
			});
		}

		var grCorpSummaryPosition = new GlideRecord(data.headcountTable);
		grCorpSummaryPosition.addQuery('u_active', true);
		grCorpSummaryPosition.addQuery('u_franchise.u_name', 'Corporate Development and Business Transformation');
		grCorpSummaryPosition.query();
		
		while (grCorpSummaryPosition.next()) {
			data.corp.push({
				'sys_id': grCorpSummaryPosition.getUniqueValue(),
				'position': grCorpSummaryPosition.getDisplayValue('u_position'),
				'sub_function': grCorpSummaryPosition.u_position.u_job_sub_function.toString(),
				'commissions': grCorpSummaryPosition.u_position.u_commissions.toString(),
				'cost': parseFloat(grCorpSummaryPosition.getValue('u_avg_cost')),
				'distribution': parseFloat(grCorpSummaryPosition.getValue('u_distribution')),
				'hctotal': parseInt(grCorpSummaryPosition.getValue('u_current_headcount')),
				'tcost': parseInt(grCorpSummaryPosition.getValue('u_current_headcount')) * parseFloat(grCorpSummaryPosition.getValue('u_avg_cost'))
			});
		}

		if (data.corp.length > 0) {
			for (var i = 0; i < data.corp.length; i++) {
				var subfunction = data.corp[i].sub_function;
				var prod85 = parseFloat(CallbackToFindPositionProduction(data.corpPosition, subfunction));

				data.corp[i].hc2018 = Math.round(((data.corpRevGrowth2019 * 1000) / prod85) * data.corp[i].distribution);
				data.corp[i].hc2019 = Math.round(((data.corpRevGrowth2020 * 1000) / prod85) * data.corp[i].distribution);
				data.corp[i].hc2020 = Math.round(((data.corpRevGrowth2021 * 1000) / prod85) * data.corp[i].distribution);
				data.corp[i].hc2021 = Math.round(((data.corpRevGrowth2022 * 1000) / prod85) * data.corp[i].distribution);

				data.corphcactual += data.corp[i].hctotal;
				data.corphc2018 += data.corp[i].hc2018;
				data.corphc2019 += data.corp[i].hc2019;
				data.corphc2020 += data.corp[i].hc2020;
				data.corphc2021 += data.corp[i].hc2021;

				data.corp[i].hcCost2018 = data.corp[i].cost * data.corp[i].hc2018;
				data.corp[i].hcCost2019 = data.corp[i].cost * data.corp[i].hc2019;
				data.corp[i].hcCost2020 = data.corp[i].cost * data.corp[i].hc2020;
				data.corp[i].hcCost2021 = data.corp[i].cost * data.corp[i].hc2021;

				data.corpWF2018 += data.corp[i].hcCost2018;
				data.corpWF2019 += data.corp[i].hcCost2019;
				data.corpWF2020 += data.corp[i].hcCost2020;
				data.corpWF2021 += data.corp[i].hcCost2021;
			}

			data.corphc2018 += data.corphcactual;
			data.corphc2019 += data.corphc2018;
			data.corphc2020 += data.corphc2019;
			data.corphc2021 += data.corphc2020;
		}

		// Total up Additional Workforce for Summary Table
		data.addWF2018 = 0;
		data.addWF2019 = 0;
		data.addWF2020 = 0;
		data.addWF2021 = 0;

		data.addWF2018 = data.ethiconWF2018 + data.dpsWF2018 + data.cssWF2018 + data.opsWF2018 + data.govWF2018 + data.corpWF2018;
		data.addWF2019 = data.ethiconWF2019 + data.dpsWF2019 + data.cssWF2019 + data.opsWF2019 + data.govWF2019 + data.corpWF2019;
		data.addWF2020 = data.ethiconWF2020 + data.dpsWF2020 + data.cssWF2020 + data.opsWF2020 + data.govWF2020 + data.corpWF2020;
		data.addWF2021 = data.ethiconWF2021 + data.dpsWF2021 + data.cssWF2021 + data.opsWF2021 + data.govWF2021 + data.corpWF2021;

		data.totalWF2018 = data.wfCurrent + parseFloat(data.addWF2018);
		data.totalWF2019 = data.totalWF2018 + parseFloat(data.addWF2019);
		data.totalWF2020 = data.totalWF2019 + parseFloat(data.addWF2020);
		data.totalWF2021 = data.totalWF2020 + parseFloat(data.addWF2021);

		data.wfcPofOpex2018 = data.totalWF2018 / data.opexN2018 * 100;
		data.wfcPofOpex2019 = data.totalWF2019 / data.opexN2019 * 100;
		data.wfcPofOpex2020 = data.totalWF2020 / data.opexN2020 * 100;
		data.wfcPofOpex2021 = data.totalWF2021 / data.opexN2021 * 100;

		data.totalHCcurrent = data.ethhcactual + data.dpshcactual + data.csshcactual + data.opshcactual + data.govhcactual + data.corphcactual;
		data.totalHC2018 = data.ethhc2018 + data.dpshc2018 + data.csshc2018 + data.opshc2018 + data.govhc2018 + data.corphc2018;
		data.totalHC2019 = data.ethhc2019 + data.dpshc2019 + data.csshc2019 + data.opshc2019 + data.govhc2019 + data.corphc2019;
		data.totalHC2020 = data.ethhc2020 + data.dpshc2020 + data.csshc2020 + data.opshc2020 + data.govhc2020 + data.corphc2020;
		data.totalHC2021 = data.ethhc2021 + data.dpshc2021 + data.csshc2021 + data.opshc2021 + data.govhc2021 + data.corphc2021;
		
		// If you have a default User Model, we will load it on the Plan page
		// (Read Only)
		if (data.read_only == 'true') {
			var grInitialUserModel = new GlideRecord('u_user_models');
			grInitialUserModel.addQuery('u_user', gs.getUserID());
			grInitialUserModel.addQuery('u_default', 'true');
			grInitialUserModel.query();

			if (grInitialUserModel.next()) {
				data.distributionCss = parseFloat(grInitialUserModel.getValue('u_distribution_css'));
				data.distributionDepuy = parseFloat(grInitialUserModel.getValue('u_distribution_depuy'));
				data.distributionEth = parseFloat(grInitialUserModel.getValue('u_distribution_ethicon'));
				data.opexInc = parseFloat(grInitialUserModel.getValue('u_opex_inc'));
				data.revenueGrowth2019 = parseFloat(grInitialUserModel.getValue('u_rev_growth_2019'));
				data.revenueGrowth2020 = parseFloat(grInitialUserModel.getValue('u_rev_growth_2020'));
				data.revenueGrowth2021 = parseFloat(grInitialUserModel.getValue('u_rev_growth_2021'));
				data.revenueGrowth2022 = parseFloat(grInitialUserModel.getValue('u_rev_growth_2022'));

				// Now to calculate other data values
				data.revenue2019 = data.revenue2018 * (1 + data.revenueGrowth2019 / 100);
				data.revenue2020 = data.revenue2019 * (1 + data.revenueGrowth2020 / 100);
				data.revenue2021 = data.revenue2020 * (1 + data.revenueGrowth2021 / 100);
				data.revenue2022 = data.revenue2021 * (1 + data.revenueGrowth2022 / 100);

				data.revenueCss2018 = data.revenue2018 * data.distributionCss / 100;
				data.revenueDepuy2018 = data.revenue2018 * data.distributionDepuy / 100;
				data.revenueEth2018 = data.revenue2018 * data.distributionEth / 100;

				data.revenueCss2019 = data.revenue2019 * data.distributionCss / 100;
				data.revenueDepuy2019 = data.revenue2019 * data.distributionDepuy / 100;
				data.revenueEth2019 = data.revenue2019 * data.distributionEth / 100;
				data.revenueOps2019 = data.revenue2019 - data.revenue2018;
				data.revenueGov2019 = data.revenue2019 - data.revenue2018;
				data.revenueCorp2019 = data.revenue2019 - data.revenue2018;

				data.revenueCss2020 = data.revenue2020 * data.distributionCss / 100;
				data.revenueDepuy2020 = data.revenue2020 * data.distributionDepuy / 100;
				data.revenueEth2020 = data.revenue2020 * data.distributionEth / 100;
				data.revenueOps2020 = data.revenue2020 - data.revenue2019;
				data.revenueGov2020 = data.revenue2020 - data.revenue2019;
				data.revenueCorp2020 = data.revenue2020 - data.revenue2019;

				data.revenueCss2021 = data.revenue2021 * data.distributionCss / 100;
				data.revenueDepuy2021 = data.revenue2021 * data.distributionDepuy / 100;
				data.revenueEth2021 = data.revenue2021 * data.distributionEth / 100;
				data.revenueOps2021 = data.revenue2021 - data.revenue2020;
				data.revenueGov2021 = data.revenue2021 - data.revenue2020;
				data.revenueCorp2021 = data.revenue2021 - data.revenue2020;

				data.revenueCss2022 = data.revenue2022 * data.distributionCss / 100;
				data.revenueDepuy2022 = data.revenue2022 * data.distributionDepuy / 100;
				data.revenueEth2022 = data.revenue2022 * data.distributionEth / 100;
				data.revenueOps2022 = data.revenue2022 - data.revenue2021;
				data.revenueGov2022 = data.revenue2022 - data.revenue2021;
				data.revenueCorp2022 = data.revenue2022 - data.revenue2021;

				data.opex2019 = data.opex2018 * (1 + data.opexInc / 100);
				data.opex2020 = data.opex2019 * (1 + data.opexInc / 100);
				data.opex2021 = data.opex2020 * (1 + data.opexInc / 100);
				data.opex2022 = data.opex2021 * (1 + data.opexInc / 100);

				data.opexN2018 = data.revenue2018 * data.opex2018 * 10;
				data.opexN2019 = data.revenue2019 * data.opex2019 * 10;
				data.opexN2020 = data.revenue2020 * data.opex2020 * 10;
				data.opexN2021 = data.revenue2021 * data.opex2021 * 10;
				data.opexN2022 = data.revenue2022 * data.opex2022 * 10;

				data.addWF2018 = 0;
				data.addWF2019 = 0;
				data.addWF2020 = 0;
				data.addWF2021 = 0;

				// Pull saved Franchise data
				var parent_sysid = grInitialUserModel.getUniqueValue();
				var grInitialFranchiseModel = new GlideRecord('u_user_franchise_model');
				grInitialFranchiseModel.addQuery('u_parent', parent_sysid);
				grInitialFranchiseModel.query();

				while (grInitialFranchiseModel.next()) {
					var franchise = grInitialFranchiseModel.getDisplayValue('u_franchise');
					var category = grInitialFranchiseModel.getDisplayValue('u_category');
					var pos = -1;

					switch (franchise) {
						case 'Ethicon':
							pos = CallbackToFindPosition(data.ethPosition, category);
							data.ethPosition[pos].prod100 = parseFloat(grInitialFranchiseModel.getValue('u_100prod'));
							data.ethPosition[pos].prod85 = parseFloat(grInitialFranchiseModel.getValue('u_100prod')) * 0.85;
							break;

						case 'DePuy Synthes':
							pos = CallbackToFindPosition(data.dssPosition, category);
							data.dssPosition[pos].prod100 = parseFloat(grInitialFranchiseModel.getValue('u_100prod'));
							data.dssPosition[pos].prod85 = parseFloat(grInitialFranchiseModel.getValue('u_100prod')) * 0.85;
							break;

						case 'CSS':
							pos = CallbackToFindPosition(data.cssPosition, category);
							data.cssPosition[pos].prod100 = parseFloat(grInitialFranchiseModel.getValue('u_100prod'));
							data.cssPosition[pos].prod85 = parseFloat(grInitialFranchiseModel.getValue('u_100prod')) * 0.85;
							break;

						case 'Ops & Ed':
							pos = CallbackToFindPosition(data.opsPosition, category);
							data.opsPosition[pos].prod100 = parseFloat(grInitialFranchiseModel.getValue('u_100prod'));
							data.opsPosition[pos].prod85 = parseFloat(grInitialFranchiseModel.getValue('u_100prod')) * 0.85;
							break;

						case 'Gov\'t Affairs':
							pos = CallbackToFindPosition(data.govPosition, category);
							data.govPosition[pos].prod100 = parseFloat(grInitialFranchiseModel.getValue('u_100prod'));
							data.govPosition[pos].prod85 = parseFloat(grInitialFranchiseModel.getValue('u_100prod')) * 0.85;
							break;

						case 'Corp Dev & BT':
							pos = CallbackToFindPosition(data.corpPosition, category);
							data.corpPosition[pos].prod100 = parseFloat(grInitialFranchiseModel.getValue('u_100prod'));
							data.corpPosition[pos].prod85 = parseFloat(grInitialFranchiseModel.getValue('u_100prod')) * 0.85;
							break;
					}
				}

				if (data.ethicon.length > 0) {
					data.ethiconWF2018 = 0;
					data.ethiconWF2019 = 0;
					data.ethiconWF2020 = 0;
					data.ethiconWF2021 = 0;
					data.ethhc2018 = 0;
					data.ethhc2019 = 0;
					data.ethhc2020 = 0;
					data.ethhc2021 = 0;
					data.ethhcactual = 0;

					data.ethiconRevGrowth2019 = (data.revenueEth2019 - data.revenueEth2018) * 1000;
					data.ethiconRevGrowth2020 = (data.revenueEth2020 - data.revenueEth2019) * 1000;
					data.ethiconRevGrowth2021 = (data.revenueEth2021 - data.revenueEth2020) * 1000;
					data.ethiconRevGrowth2022 = (data.revenueEth2022 - data.revenueEth2021) * 1000;

					for (var i = 0; i < data.ethicon.length; i++) {
						if (data.ethicon[i].sub_function == 'Selling MD&D' && data.ethicon[i].commissions == 'true') {
							data.ethicon[i].hc2018 = Math.round(((data.ethiconRevGrowth2019 * (data.ethicon[i].rev_percent)) / data.ethicon[i].avg_quota) * 1.15);
							data.ethicon[i].hc2019 = Math.round(((data.ethiconRevGrowth2020 * (data.ethicon[i].rev_percent)) / data.ethicon[i].avg_quota) * 1.15);
							data.ethicon[i].hc2020 = Math.round(((data.ethiconRevGrowth2021 * (data.ethicon[i].rev_percent)) / data.ethicon[i].avg_quota) * 1.15);
							data.ethicon[i].hc2021 = Math.round(((data.ethiconRevGrowth2022 * (data.ethicon[i].rev_percent)) / data.ethicon[i].avg_quota) * 1.15);

							if (!isNaN(data.ethicon[i].distribution)) {
								data.ethicon[i].hc2018 = Math.round(data.ethicon[i].hc2018 * data.ethicon[i].distribution);
								data.ethicon[i].hc2019 = Math.round(data.ethicon[i].hc2019 * data.ethicon[i].distribution);
								data.ethicon[i].hc2020 = Math.round(data.ethicon[i].hc2020 * data.ethicon[i].distribution);
								data.ethicon[i].hc2021 = Math.round(data.ethicon[i].hc2021 * data.ethicon[i].distribution);
							}
						}
						else {
							var subfunction = data.ethicon[i].sub_function;
							var prod85 = parseFloat(CallbackToFindPositionProduction(data.ethPosition, subfunction));

							data.ethicon[i].hc2018 = Math.round((data.ethiconRevGrowth2019 / (prod85 * 1000)) * data.ethicon[i].distribution);
							data.ethicon[i].hc2019 = Math.round((data.ethiconRevGrowth2020 / (prod85 * 1000)) * data.ethicon[i].distribution);
							data.ethicon[i].hc2020 = Math.round((data.ethiconRevGrowth2021 / (prod85 * 1000)) * data.ethicon[i].distribution);
							data.ethicon[i].hc2021 = Math.round((data.ethiconRevGrowth2022 / (prod85 * 1000)) * data.ethicon[i].distribution);
						}

						data.ethhcactual += data.ethicon[i].hctotal;
						data.ethhc2018 += data.ethicon[i].hc2018;
						data.ethhc2019 += data.ethicon[i].hc2019;
						data.ethhc2020 += data.ethicon[i].hc2020;
						data.ethhc2021 += data.ethicon[i].hc2021;

						data.ethicon[i].hcCost2018 = data.ethicon[i].cost * data.ethicon[i].hc2018;
						data.ethicon[i].hcCost2019 = data.ethicon[i].cost * data.ethicon[i].hc2019;
						data.ethicon[i].hcCost2020 = data.ethicon[i].cost * data.ethicon[i].hc2020;
						data.ethicon[i].hcCost2021 = data.ethicon[i].cost * data.ethicon[i].hc2021;

						data.ethiconWF2018 += data.ethicon[i].hcCost2018;
						data.ethiconWF2019 += data.ethicon[i].hcCost2019;
						data.ethiconWF2020 += data.ethicon[i].hcCost2020;
						data.ethiconWF2021 += data.ethicon[i].hcCost2021;
					}

					data.ethhc2018 += data.ethhcactual;
					data.ethhc2019 += data.ethhc2018;
					data.ethhc2020 += data.ethhc2019;
					data.ethhc2021 += data.ethhc2020;
				}

				if (data.dps.length > 0) {
					data.dpsWF2018 = 0;
					data.dpsWF2019 = 0;
					data.dpsWF2020 = 0;
					data.dpsWF2021 = 0;
					data.dpshc2018 = 0;
					data.dpshc2019 = 0;
					data.dpshc2020 = 0;
					data.dpshc2021 = 0;
					data.dpshcactual = 0;

					data.dpsRevGrowth2019 = (data.revenueDepuy2019 - data.revenueDepuy2018);
					data.dpsRevGrowth2020 = (data.revenueDepuy2020 - data.revenueDepuy2019);
					data.dpsRevGrowth2021 = (data.revenueDepuy2021 - data.revenueDepuy2020);
					data.dpsRevGrowth2022 = (data.revenueDepuy2022 - data.revenueDepuy2021);
		
					for (var i = 0; i < data.dps.length; i++) {
						if (data.dps[i].sub_function == 'Selling MD&D' && data.dps[i].commissions == 'true') {
							data.dps[i].hc2018 = Math.round(((data.dpsRevGrowth2019 * (data.dps[i].rev_percent)) / data.dps[i].avg_quota));
							data.dps[i].hc2019 = Math.round(((data.dpsRevGrowth2020 * (data.dps[i].rev_percent)) / data.dps[i].avg_quota));
							data.dps[i].hc2020 = Math.round(((data.dpsRevGrowth2021 * (data.dps[i].rev_percent)) / data.dps[i].avg_quota));
							data.dps[i].hc2021 = Math.round(((data.dpsRevGrowth2022 * (data.dps[i].rev_percent)) / data.dps[i].avg_quota));

							if (!isNaN(data.dps[i].distribution)) {
								data.dps[i].hc2018 = Math.round(data.dps[i].hc2018 * data.dps[i].distribution);
								data.dps[i].hc2019 = Math.round(data.dps[i].hc2019 * data.dps[i].distribution);
								data.dps[i].hc2020 = Math.round(data.dps[i].hc2020 * data.dps[i].distribution);
								data.dps[i].hc2021 = Math.round(data.dps[i].hc2021 * data.dps[i].distribution);
							}
						}
						else {
							var subfunction = data.dps[i].sub_function;
							var prod85 = parseFloat(CallbackToFindPositionProduction(data.dpsPosition, subfunction));

							data.dps[i].hc2018 = Math.round((data.dpsRevGrowth2019 / (prod85)) * data.dps[i].distribution);
							data.dps[i].hc2019 = Math.round((data.dpsRevGrowth2020 / (prod85)) * data.dps[i].distribution);
							data.dps[i].hc2020 = Math.round((data.dpsRevGrowth2021 / (prod85)) * data.dps[i].distribution);
							data.dps[i].hc2021 = Math.round((data.dpsRevGrowth2022 / (prod85)) * data.dps[i].distribution);
						}

						data.dpshcactual += data.dps[i].hctotal;
						data.dpshc2018 += data.dps[i].hc2018;
						data.dpshc2019 += data.dps[i].hc2019;
						data.dpshc2020 += data.dps[i].hc2020;
						data.dpshc2021 += data.dps[i].hc2021;

						data.dps[i].hcCost2018 = data.dps[i].cost * data.dps[i].hc2018;
						data.dps[i].hcCost2019 = data.dps[i].cost * data.dps[i].hc2019;
						data.dps[i].hcCost2020 = data.dps[i].cost * data.dps[i].hc2020;
						data.dps[i].hcCost2021 = data.dps[i].cost * data.dps[i].hc2021;

						data.dpsWF2018 += data.dps[i].hcCost2018;
						data.dpsWF2019 += data.dps[i].hcCost2019;
						data.dpsWF2020 += data.dps[i].hcCost2020;
						data.dpsWF2021 += data.dps[i].hcCost2021;
					}

					data.dpshc2018 += data.dpshcactual;
					data.dpshc2019 += data.dpshc2018;
					data.dpshc2020 += data.dpshc2019;
					data.dpshc2021 += data.dpshc2020;
				}

				if (data.css.length > 0) {
					data.cssWF2018 = 0;
					data.cssWF2019 = 0;
					data.cssWF2020 = 0;
					data.cssWF2021 = 0;
					data.csshc2018 = 0;
					data.csshc2019 = 0;
					data.csshc2020 = 0;
					data.csshc2021 = 0;
					data.csshcactual = 0;

					data.cssRevGrowth2019 = (data.revenueCss2019 - data.revenueCss2018);
					data.cssRevGrowth2020 = (data.revenueCss2020 - data.revenueCss2019);
					data.cssRevGrowth2021 = (data.revenueCss2021 - data.revenueCss2020);
					data.cssRevGrowth2022 = (data.revenueCss2022 - data.revenueCss2021);

					for (var i = 0; i < data.css.length; i++) {
						if (data.css[i].sub_function == 'Selling MD&D' && data.css[i].commissions == 'true') {
							data.css[i].hc2018 = Math.round(((data.cssRevGrowth2019 * (data.css[i].rev_percent)) / data.css[i].avg_quota));
							data.css[i].hc2019 = Math.round(((data.cssRevGrowth2020 * (data.css[i].rev_percent)) / data.css[i].avg_quota));
							data.css[i].hc2020 = Math.round(((data.cssRevGrowth2021 * (data.css[i].rev_percent)) / data.css[i].avg_quota));
							data.css[i].hc2021 = Math.round(((data.cssRevGrowth2022 * (data.css[i].rev_percent)) / data.css[i].avg_quota));

							if (!isNaN(data.css[i].distribution)) {
								data.css[i].hc2018 = Math.round(data.css[i].hc2018 * data.css[i].distribution);
								data.css[i].hc2019 = Math.round(data.css[i].hc2019 * data.css[i].distribution);
								data.css[i].hc2020 = Math.round(data.css[i].hc2020 * data.css[i].distribution);
								data.css[i].hc2021 = Math.round(data.css[i].hc2021 * data.css[i].distribution);
							}
						}
						else if (data.css[i].distribution == 0) {
							data.css[i].hc2018 = 0;
							data.css[i].hc2019 = 0;
							data.css[i].hc2020 = 0;
							data.css[i].hc2021 = 0;
						}
						else {
							var subfunction = data.css[i].sub_function;
							var prod85 = parseFloat(CallbackToFindPositionProduction(data.cssPosition, subfunction));

							data.css[i].hc2018 = Math.round((data.cssRevGrowth2019 * 1000 / (prod85)) * data.css[i].distribution);
							data.css[i].hc2019 = Math.round((data.cssRevGrowth2020 * 1000 / (prod85)) * data.css[i].distribution);
							data.css[i].hc2020 = Math.round((data.cssRevGrowth2021 * 1000 / (prod85)) * data.css[i].distribution);
							data.css[i].hc2021 = Math.round((data.cssRevGrowth2022 * 1000 / (prod85)) * data.css[i].distribution);
						}

						data.csshcactual += data.css[i].hctotal;
						data.csshc2018 += data.css[i].hc2018;
						data.csshc2019 += data.css[i].hc2019;
						data.csshc2020 += data.css[i].hc2020;
						data.csshc2021 += data.css[i].hc2021;

						data.css[i].hcCost2018 = data.css[i].cost * data.css[i].hc2018;
						data.css[i].hcCost2019 = data.css[i].cost * data.css[i].hc2019;
						data.css[i].hcCost2020 = data.css[i].cost * data.css[i].hc2020;
						data.css[i].hcCost2021 = data.css[i].cost * data.css[i].hc2021;

						data.cssWF2018 += data.css[i].hcCost2018;
						data.cssWF2019 += data.css[i].hcCost2019;
						data.cssWF2020 += data.css[i].hcCost2020;
						data.cssWF2021 += data.css[i].hcCost2021;
					}

					data.csshc2018 += data.csshcactual;
					data.csshc2019 += data.csshc2018;
					data.csshc2020 += data.csshc2019;
					data.csshc2021 += data.csshc2020;
				}

				if (data.ops.length > 0) {
					data.opsWF2018 = 0;
					data.opsWF2019 = 0;
					data.opsWF2020 = 0;
					data.opsWF2021 = 0;
					data.opshc2018 = 0;
					data.opshc2019 = 0;
					data.opshc2020 = 0;
					data.opshc2021 = 0;
					data.opshcactual = 0;

					data.opsRevGrowth2019 = data.revenueOps2019;
					data.opsRevGrowth2020 = data.revenueOps2020;
					data.opsRevGrowth2021 = data.revenueOps2021;
					data.opsRevGrowth2022 = data.revenueOps2022;

					for (var i = 0; i < data.ops.length; i++) {
						var subfunction = data.ops[i].sub_function;
						var prod85 = parseFloat(CallbackToFindPositionProduction(data.opsPosition, subfunction));

						data.ops[i].hc2018 = Math.round(((data.opsRevGrowth2019 * 1000) / prod85) * data.ops[i].distribution);
						data.ops[i].hc2019 = Math.round(((data.opsRevGrowth2020 * 1000) / prod85) * data.ops[i].distribution);
						data.ops[i].hc2020 = Math.round(((data.opsRevGrowth2021 * 1000) / prod85) * data.ops[i].distribution);
						data.ops[i].hc2021 = Math.round(((data.opsRevGrowth2022 * 1000) / prod85) * data.ops[i].distribution);
						
						data.opshcactual += data.ops[i].hctotal;
						data.opshc2018 += data.ops[i].hc2018;
						data.opshc2019 += data.ops[i].hc2019;
						data.opshc2020 += data.ops[i].hc2020;
						data.opshc2021 += data.ops[i].hc2021;

						data.ops[i].hcCost2018 = data.ops[i].cost * data.ops[i].hc2018;
						data.ops[i].hcCost2019 = data.ops[i].cost * data.ops[i].hc2019;
						data.ops[i].hcCost2020 = data.ops[i].cost * data.ops[i].hc2020;
						data.ops[i].hcCost2021 = data.ops[i].cost * data.ops[i].hc2021;

						data.opsWF2018 += data.ops[i].hc2018;
						data.opsWF2019 += data.ops[i].hcCost2019;
						data.opsWF2020 += data.ops[i].hcCost2020;
						data.opsWF2021 += data.ops[i].hcCost2021;
					}

					data.opshc2018 += data.opshcactual;
					data.opshc2019 += data.opshc2018;
					data.opshc2020 += data.opshc2019;
					data.opshc2021 += data.opshc2020;
				}

				if (data.gov.length > 0) {
					data.govWF2018 = 0;
					data.govWF2019 = 0;
					data.govWF2020 = 0;
					data.govWF2021 = 0;
					data.govhc2018 = 0;
					data.govhc2019 = 0;
					data.govhc2020 = 0;
					data.govhc2021 = 0;
					data.govhcactual = 0;

					data.govRevGrowth2019 = data.revenueGov2019;
					data.govRevGrowth2020 = data.revenueGov2020;
					data.govRevGrowth2021 = data.revenueGov2021;
					data.govRevGrowth2022 = data.revenueGov2022;

					for (var i = 0; i < data.gov.length; i++) {
						var subfunction = data.gov[i].sub_function;
						var prod85 = parseFloat(CallbackToFindPositionProduction(data.govPosition, subfunction));

						data.gov[i].hc2018 = Math.round(((data.govRevGrowth2019 * 1000) / prod85) * data.gov[i].distribution);
						data.gov[i].hc2019 = Math.round(((data.govRevGrowth2020 * 1000) / prod85) * data.gov[i].distribution);
						data.gov[i].hc2020 = Math.round(((data.govRevGrowth2021 * 1000) / prod85) * data.gov[i].distribution);
						data.gov[i].hc2021 = Math.round(((data.govRevGrowth2022 * 1000) / prod85) * data.gov[i].distribution);

						data.govhcactual += data.gov[i].hctotal;
						data.govhc2018 += data.gov[i].hc2018;
						data.govhc2019 += data.gov[i].hc2019;
						data.govhc2020 += data.gov[i].hc2020;
						data.govhc2021 += data.gov[i].hc2021;

						data.gov[i].hcCost2018 = data.gov[i].cost * data.gov[i].hc2018;
						data.gov[i].hcCost2019 = data.gov[i].cost * data.gov[i].hc2019;
						data.gov[i].hcCost2020 = data.gov[i].cost * data.gov[i].hc2020;
						data.gov[i].hcCost2021 = data.gov[i].cost * data.gov[i].hc2021;

						data.govWF2018 += data.gov[i].hcCost2018;
						data.govWF2019 += data.gov[i].hcCost2019;
						data.govWF2020 += data.gov[i].hcCost2020;
						data.govWF2021 += data.gov[i].hcCost2021;
					}

					data.govhc2018 += data.govhcactual;
					data.govhc2019 += data.govhc2018;
					data.govhc2020 += data.govhc2019;
					data.govhc2021 += data.govhc2020;
				}

				if (data.corp.length > 0) {
					data.corpWF2018 = 0;
					data.corpWF2019 = 0;
					data.corpWF2020 = 0;
					data.corpWF2021 = 0;
					data.corphc2018 = 0;
					data.corphc2019 = 0;
					data.corphc2020 = 0;
					data.corphc2021 = 0;
					data.corphcactual = 0;

					data.corpRevGrowth2019 = data.revenueCorp2019;
					data.corpRevGrowth2020 = data.revenueCorp2020;
					data.corpRevGrowth2021 = data.revenueCorp2021;
					data.corpRevGrowth2022 = data.revenueCorp2022;

					for (var i = 0; i < data.corp.length; i++) {
						var subfunction = data.corp[i].sub_function;
						var prod85 = parseFloat(CallbackToFindPositionProduction(data.corpPosition, subfunction));

						data.corp[i].hc2018 = Math.round(((data.corpRevGrowth2019 * 1000) / prod85) * data.corp[i].distribution);
						data.corp[i].hc2019 = Math.round(((data.corpRevGrowth2020 * 1000) / prod85) * data.corp[i].distribution);
						data.corp[i].hc2020 = Math.round(((data.corpRevGrowth2021 * 1000) / prod85) * data.corp[i].distribution);
						data.corp[i].hc2021 = Math.round(((data.corpRevGrowth2022 * 1000) / prod85) * data.corp[i].distribution);

						data.corphcactual += data.corp[i].hctotal;
						data.corphc2018 += data.corp[i].hc2018;
						data.corphc2019 += data.corp[i].hc2019;
						data.corphc2020 += data.corp[i].hc2020;
						data.corphc2021 += data.corp[i].hc2021;

						data.corp[i].hcCost2018 = data.corp[i].cost * data.corp[i].hc2018;
						data.corp[i].hcCost2019 = data.corp[i].cost * data.corp[i].hc2019;
						data.corp[i].hcCost2020 = data.corp[i].cost * data.corp[i].hc2020;
						data.corp[i].hcCost2021 = data.corp[i].cost * data.corp[i].hc2021;

						data.corpWF2018 += data.corp[i].hcCost2018;
						data.corpWF2019 += data.corp[i].hcCost2019;
						data.corpWF2020 += data.corp[i].hcCost2020;
						data.corpWF2021 += data.corp[i].hcCost2021;
					}

					data.corphc2018 += data.corphcactual;
					data.corphc2019 += data.corphc2018;
					data.corphc2020 += data.corphc2019;
					data.corphc2021 += data.corphc2020;
				}

				// Total up Additional Workforce for Summary Table
				data.addWF2018 = data.ethiconWF2018 + data.dpsWF2018 + data.cssWF2018 + data.opsWF2018 + data.govWF2018 + data.corpWF2018;
				data.addWF2019 = data.ethiconWF2019 + data.dpsWF2019 + data.cssWF2019 + data.opsWF2019 + data.govWF2019 + data.corpWF2019;
				data.addWF2020 = data.ethiconWF2020 + data.dpsWF2020 + data.cssWF2020 + data.opsWF2020 + data.govWF2020 + data.corpWF2020;
				data.addWF2021 = data.ethiconWF2021 + data.dpsWF2021 + data.cssWF2021 + data.opsWF2021 + data.govWF2021 + data.corpWF2021;

				data.totalWF2018 = data.wfCurrent + parseFloat(data.addWF2018);
				data.totalWF2019 = data.totalWF2018 + parseFloat(data.addWF2019);
				data.totalWF2020 = data.totalWF2019 + parseFloat(data.addWF2020);
				data.totalWF2021 = data.totalWF2020 + parseFloat(data.addWF2021);

				data.wfcPofOpex2018 = data.totalWF2018 / data.opexN2018 * 100;
				data.wfcPofOpex2019 = data.totalWF2019 / data.opexN2019 * 100;
				data.wfcPofOpex2020 = data.totalWF2020 / data.opexN2020 * 100;
				data.wfcPofOpex2021 = data.totalWF2021 / data.opexN2021 * 100;

				data.totalHCcurrent = data.ethhcactual + data.dpshcactual + data.csshcactual + data.opshcactual + data.govhcactual + data.corphcactual;
				data.totalHC2018 = data.ethhc2018 + data.dpshc2018 + data.csshc2018 + data.opshc2018 + data.govhc2018 + data.corphc2018;
				data.totalHC2019 = data.ethhc2019 + data.dpshc2019 + data.csshc2019 + data.opshc2019 + data.govhc2019 + data.corphc2019;
				data.totalHC2020 = data.ethhc2020 + data.dpshc2020 + data.csshc2020 + data.opshc2020 + data.govhc2020 + data.corphc2020;
				data.totalHC2021 = data.ethhc2021 + data.dpshc2021 + data.csshc2021 + data.opshc2021 + data.govhc2021 + data.corphc2021;
				
				data.working = 'Your Default User';
			}
		}
	}

	if (input) {
		// Button controls for saving and applying User Models
		if (input.button) {
			var button = input.button;

			// Create Franchise variables
			var pos = -1;
			data.ethPosition = [];
			data.ethicon = [];
			data.dssPosition = [];
			data.dss = [];
			data.cssPosition = [];
			data.css = [];
			data.opsPosition = [];
			data.ops = [];
			data.govPosition = [];
			data.gov = [];
			data.corpPosition = [];
			data.corp = [];

			var grEthProductivity = new GlideRecord(data.productivityTable);
			grEthProductivity.addQuery('u_active', true);
			grEthProductivity.addQuery('u_franchise.u_name', 'Ethicon');
			grEthProductivity.addQuery('u_number','STARTSWITH', 'PRO');
			grEthProductivity.query();
			
			while (grEthProductivity.next()) {
				pos = CallbackToFindPosition(input.ethPosition, grEthProductivity.getDisplayValue('u_category'));
				data.ethPosition.push({
					'sys_id': grEthProductivity.getUniqueValue(),
					'category': grEthProductivity.getDisplayValue('u_category'),
					'prod100': parseFloat(input.ethPosition[pos].prod100),
					'prod85': parseFloat(input.ethPosition[pos].prod100) * .85
				});
			}

			var grEthSummaryPosition = new GlideRecord(data.headcountTable);
			grEthSummaryPosition.addQuery('u_active', true);
			grEthSummaryPosition.addQuery('u_franchise.u_name', 'Ethicon');
			grEthSummaryPosition.query();
			
			while (grEthSummaryPosition.next()) {
				data.ethicon.push({
					'sys_id': grEthSummaryPosition.getUniqueValue(),
					'position': grEthSummaryPosition.u_position.u_display.toString(),
					'sub_function': grEthSummaryPosition.u_position.u_job_sub_function.toString(),
					'commissions': grEthSummaryPosition.u_position.u_commissions.toString(),
					'cost': parseFloat(grEthSummaryPosition.getValue('u_avg_cost')),
					'rev_percent': parseFloat(grEthSummaryPosition.getValue('u_percent_rev')),
					'avg_quota': parseFloat(grEthSummaryPosition.getValue('u_total_avg_quota')),
					'distribution': parseFloat(grEthSummaryPosition.getValue('u_distribution'))
				});
			}

			var grDPSProductivity = new GlideRecord(data.productivityTable);
			grDPSProductivity.addQuery('u_active', true);
			grDPSProductivity.addQuery('u_franchise.u_name', 'DePuy Synthes');
			grDPSProductivity.addQuery('u_number','STARTSWITH', 'PRO');
			grDPSProductivity.query();
			
			while (grDPSProductivity.next()) {
				pos = CallbackToFindPosition(input.dpsPosition, grDPSProductivity.getDisplayValue('u_category'));
				data.dpsPosition.push({
					'sys_id': grDPSProductivity.getUniqueValue(),
					'category': grDPSProductivity.getDisplayValue('u_category'),
					'prod100': parseFloat(input.dpsPosition[pos].prod100),
					'prod85': parseFloat(input.dpsPosition[pos].prod100) * .85
				});
			}

			var grDPSSummaryPosition = new GlideRecord(data.headcountTable);
			grDPSSummaryPosition.addQuery('u_active', true);
			grDPSSummaryPosition.addQuery('u_franchise.u_name', 'DePuy Synthes');
			grDPSSummaryPosition.query();
			
			while (grDPSSummaryPosition.next()) {
				data.dps.push({
					'sys_id': grDPSSummaryPosition.getUniqueValue(),
					'position': grDPSSummaryPosition.getDisplayValue('u_position'),
					'sub_function': grDPSSummaryPosition.u_position.u_job_sub_function.toString(),
					'commissions': grDPSSummaryPosition.u_position.u_commissions.toString(),
					'cost': parseFloat(grDPSSummaryPosition.getValue('u_avg_cost')),
					'rev_percent': parseFloat(grDPSSummaryPosition.getValue('u_percent_rev')),
					'avg_quota': parseFloat(grDPSSummaryPosition.getValue('u_total_avg_quota')),
					'distribution': parseFloat(grDPSSummaryPosition.getValue('u_distribution'))
				});
			}

			var grCSSProductivity = new GlideRecord(data.productivityTable);
			grCSSProductivity.addQuery('u_active', true);
			grCSSProductivity.addQuery('u_franchise.u_name', 'CSS');
			grCSSProductivity.addQuery('u_number','STARTSWITH', 'PRO');
			grCSSProductivity.query();
			
			while (grCSSProductivity.next()) {
				pos = CallbackToFindPosition(input.cssPosition, grCSSProductivity.getDisplayValue('u_category'));
				data.cssPosition.push({
					'sys_id': grCSSProductivity.getUniqueValue(),
					'category': grCSSProductivity.getDisplayValue('u_category'),
					'prod100': parseFloat(input.cssPosition[pos].prod100),
					'prod85': parseFloat(input.cssPosition[pos].prod100) * .85
				});
			}

			var grCSSSummaryPosition = new GlideRecord(data.headcountTable);
			grCSSSummaryPosition.addQuery('u_active', true);
			grCSSSummaryPosition.addQuery('u_franchise.u_name', 'CSS');
			grCSSSummaryPosition.query();
			
			while (grCSSSummaryPosition.next()) {
				data.css.push({
					'sys_id': grCSSSummaryPosition.getUniqueValue(),
					'position': grCSSSummaryPosition.getDisplayValue('u_position'),
					'sub_function': grCSSSummaryPosition.u_position.u_job_sub_function.toString(),
					'commissions': grCSSSummaryPosition.u_position.u_commissions.toString(),
					'cost': parseFloat(grCSSSummaryPosition.getValue('u_avg_cost')),
					'rev_percent': parseFloat(grCSSSummaryPosition.getValue('u_percent_rev')),
					'avg_quota': parseFloat(grCSSSummaryPosition.getValue('u_total_avg_quota')),
					'distribution': parseFloat(grCSSSummaryPosition.getValue('u_distribution'))
				});
			}

			var grOpsProductivity = new GlideRecord(data.productivityTable);
			grOpsProductivity.addQuery('u_active', true);
			grOpsProductivity.addQuery('u_franchise.u_name', 'Operations and Education Solution');
			grOpsProductivity.addQuery('u_number','STARTSWITH', 'PRO');
			grOpsProductivity.query();
			
			while (grOpsProductivity.next()) {
				pos = CallbackToFindPosition(input.opsPosition, grOpsProductivity.getDisplayValue('u_category'));
				data.opsPosition.push({
					'sys_id': grOpsProductivity.getUniqueValue(),
					'category': grOpsProductivity.getDisplayValue('u_category'),
					'prod100': parseFloat(input.opsPosition[pos].prod100),
					'prod85': parseFloat(input.opsPosition[pos].prod100) * .85
				});
			}

			var grOPSSummaryPosition = new GlideRecord(data.headcountTable);
			grOPSSummaryPosition.addQuery('u_active', true);
			grOPSSummaryPosition.addQuery('u_franchise.u_name', 'Operations and Education Solution');
			grOPSSummaryPosition.query();
			
			while (grOPSSummaryPosition.next()) {
				data.ops.push({
					'sys_id': grOPSSummaryPosition.getUniqueValue(),
					'position': grOPSSummaryPosition.getDisplayValue('u_position'),
					'sub_function': grOPSSummaryPosition.u_position.u_job_sub_function.toString(),
					'commissions': grOPSSummaryPosition.u_position.u_commissions.toString(),
					'cost': parseFloat(grOPSSummaryPosition.getValue('u_avg_cost')),
					'distribution': parseFloat(grOPSSummaryPosition.getValue('u_distribution'))
				});
			}

			var grGovProductivity = new GlideRecord(data.productivityTable);
			grGovProductivity.addQuery('u_active', true);
			grGovProductivity.addQuery('u_franchise.u_name', 'Government Affairs');
			grGovProductivity.addQuery('u_number','STARTSWITH', 'PRO');
			grGovProductivity.query();
			
			while (grGovProductivity.next()) {
				pos = CallbackToFindPosition(input.govPosition, grGovProductivity.getDisplayValue('u_category'));
				data.govPosition.push({
					'sys_id': grGovProductivity.getUniqueValue(),
					'category': grGovProductivity.getDisplayValue('u_category'),
					'prod100': parseFloat(input.govPosition[pos].prod100),
					'prod85': parseFloat(input.govPosition[pos].prod100) * .85
				});
			}

			var grGovSummaryPosition = new GlideRecord(data.headcountTable);
			grGovSummaryPosition.addQuery('u_active', true);
			grGovSummaryPosition.addQuery('u_franchise.u_name', 'Government Affairs');
			grGovSummaryPosition.query();
			
			while (grGovSummaryPosition.next()) {
				data.gov.push({
					'sys_id': grGovSummaryPosition.getUniqueValue(),
					'position': grGovSummaryPosition.getDisplayValue('u_position'),
					'sub_function': grGovSummaryPosition.u_position.u_job_sub_function.toString(),
					'commissions': grGovSummaryPosition.u_position.u_commissions.toString(),
					'cost': parseFloat(grGovSummaryPosition.getValue('u_avg_cost')),
					'distribution': parseFloat(grGovSummaryPosition.getValue('u_distribution'))
				});
			}

			var grCorpProductivity = new GlideRecord(data.productivityTable);
			grCorpProductivity.addQuery('u_active', true);
			grCorpProductivity.addQuery('u_franchise.u_name', 'Corporate Development and Business Transformation');
			grCorpProductivity.addQuery('u_number','STARTSWITH', 'PRO');
			grCorpProductivity.query();
			
			while (grCorpProductivity.next()) {
				pos = CallbackToFindPosition(input.corpPosition, grCorpProductivity.getDisplayValue('u_category'));
				data.corpPosition.push({
					'sys_id': grCorpProductivity.getUniqueValue(),
					'category': grCorpProductivity.getDisplayValue('u_category'),
					'prod100': parseFloat(input.corpPosition[pos].prod100),
					'prod85': parseFloat(input.corpPosition[pos].prod100) * .85
				});
			}

			var grCorpSummaryPosition = new GlideRecord(data.headcountTable);
			grCorpSummaryPosition.addQuery('u_active', true);
			grCorpSummaryPosition.addQuery('u_franchise.u_name', 'Corporate Development and Business Transformation');
			grCorpSummaryPosition.query();
			
			while (grCorpSummaryPosition.next()) {
				data.corp.push({
					'sys_id': grCorpSummaryPosition.getUniqueValue(),
					'position': grCorpSummaryPosition.getDisplayValue('u_position'),
					'sub_function': grCorpSummaryPosition.u_position.u_job_sub_function.toString(),
					'commissions': grCorpSummaryPosition.u_position.u_commissions.toString(),
					'cost': parseFloat(grCorpSummaryPosition.getValue('u_avg_cost')),
					'distribution': parseFloat(grCorpSummaryPosition.getValue('u_distribution'))
				});
			}

			switch(button) {
				case 'default':
					// This button will load your saved default user model
					var grDefaultUserModel = new GlideRecord('u_user_models');
					grDefaultUserModel.addQuery('u_user', gs.getUserID());
					grDefaultUserModel.addQuery('u_default', 'true');
					grDefaultUserModel.query();
					
					if (grDefaultUserModel.next()) {
						data.userModel_sys_id = grDefaultUserModel.getUniqueValue();
						data.distributionCss = parseFloat(grDefaultUserModel.getValue('u_distribution_css'));
						data.distributionDepuy = parseFloat(grDefaultUserModel.getValue('u_distribution_depuy'));
						data.distributionEth = parseFloat(grDefaultUserModel.getValue('u_distribution_ethicon'));
						data.opexInc = parseFloat(grDefaultUserModel.getValue('u_opex_inc'));
						data.revenueGrowth2019 = parseFloat(grDefaultUserModel.getValue('u_rev_growth_2019'));
						data.revenueGrowth2020 = parseFloat(grDefaultUserModel.getValue('u_rev_growth_2020'));
						data.revenueGrowth2021 = parseFloat(grDefaultUserModel.getValue('u_rev_growth_2021'));
						data.revenueGrowth2022 = parseFloat(grDefaultUserModel.getValue('u_rev_growth_2022'));

						// Non-input data from existing page
						data.revenue2018 = parseFloat(input.revenue2018);
						data.wfCurrent = parseFloat(input.wfCurrent);
						data.opex2018 = parseFloat(input.opex2018);
						
						// Now to calculate other data values
						data.revenue2019 = data.revenue2018 * (data.revenueGrowth2019 / 100);
						data.revenue2020 = data.revenue2019 * (data.revenueGrowth2020 / 100);
						data.revenue2021 = data.revenue2020 * (data.revenueGrowth2021 / 100);
						data.revenue2022 = data.revenue2021 * (data.revenueGrowth2022 / 100);

						data.revenueCss2018 = data.revenue2018 * data.distributionCss / 100;
						data.revenueDepuy2018 = data.revenue2018 * data.distributionDepuy / 100;
						data.revenueEth2018 = data.revenue2018 * data.distributionEth / 100;

						data.revenueCss2019 = data.revenue2019 * data.distributionCss / 100;
						data.revenueDepuy2019 = data.revenue2019 * data.distributionDepuy / 100;
						data.revenueEth2019 = data.revenue2019 * data.distributionEth / 100;
						data.revenueOps2019 = data.revenue2019 - data.revenue2018;
						data.revenueGov2019 = data.revenue2019 - data.revenue2018;
						data.revenueCorp2019 = data.revenue2019 - data.revenue2018;

						data.revenueCss2020 = data.revenue2020 * data.distributionCss / 100;
						data.revenueDepuy2020 = data.revenue2020 * data.distributionDepuy / 100;
						data.revenueEth2020 = data.revenue2020 * data.distributionEth / 100;
						data.revenueOps2020 = data.revenue2020 - data.revenue2019;
						data.revenueGov2020 = data.revenue2020 - data.revenue2019;
						data.revenueCorp2020 = data.revenue2020 - data.revenue2019;

						data.revenueCss2021 = data.revenue2021 * data.distributionCss / 100;
						data.revenueDepuy2021 = data.revenue2021 * data.distributionDepuy / 100;
						data.revenueEth2021 = data.revenue2021 * data.distributionEth / 100;
						data.revenueOps2021 = data.revenue2021 - data.revenue2020;
						data.revenueGov2021 = data.revenue2021 - data.revenue2020;
						data.revenueCorp2021 = data.revenue2021 - data.revenue2020;

						data.revenueCss2022 = data.revenue2022 * data.distributionCss / 100;
						data.revenueDepuy2022 = data.revenue2022 * data.distributionDepuy / 100;
						data.revenueEth2022 = data.revenue2022 * data.distributionEth / 100;
						data.revenueOps2022 = data.revenue2022 - data.revenue2021;
						data.revenueGov2022 = data.revenue2022 - data.revenue2021;
						data.revenueCorp2022 = data.revenue2022 - data.revenue2021;

						data.opex2019 = data.opex2018 * (1 + data.opexInc / 100);
						data.opex2020 = data.opex2019 * (1 + data.opexInc / 100);
						data.opex2021 = data.opex2020 * (1 + data.opexInc / 100);
						data.opex2022 = data.opex2021 * (1 + data.opexInc / 100);

						data.opexN2018 = data.revenue2018 * data.opex2018 * 10;
						data.opexN2019 = data.revenue2019 * data.opex2019 * 10;
						data.opexN2020 = data.revenue2020 * data.opex2020 * 10;
						data.opexN2021 = data.revenue2021 * data.opex2021 * 10;
						data.opexN2022 = data.revenue2022 * data.opex2022 * 10;

						data.addWF2018 = 0;
						data.addWF2019 = 0;
						data.addWF2020 = 0;
						data.addWF2021 = 0;

						// Pull saved Franchise data
						var parent_sysid = grDefaultUserModel.getUniqueValue();
						var grDefaultFranchiseModel = new GlideRecord('u_user_franchise_model');
						grDefaultFranchiseModel.addQuery('u_parent', parent_sysid);
						grDefaultFranchiseModel.query();

						while (grDefaultFranchiseModel.next()) {
							var franchise = grDefaultFranchiseModel.getDisplayValue('u_franchise');
							var category = grDefaultFranchiseModel.getDisplayValue('u_category');
							var pos = -1;

							switch (franchise) {
								case 'Ethicon':
									pos = CallbackToFindPosition(data.ethPosition, category);
									data.ethPosition[pos].prod100 = parseFloat(grDefaultFranchiseModel.getValue('u_100prod'));
									data.ethPosition[pos].prod85 = parseFloat(grDefaultFranchiseModel.getValue('u_100prod')) * 0.85;
									break;

								case 'DePuy Synthes':
									pos = CallbackToFindPosition(data.dssPosition, category);
									data.dssPosition[pos].prod100 = parseFloat(grDefaultFranchiseModel.getValue('u_100prod'));
									data.dssPosition[pos].prod85 = parseFloat(grDefaultFranchiseModel.getValue('u_100prod')) * 0.85;
									break;

								case 'CSS':
									pos = CallbackToFindPosition(data.cssPosition, category);
									data.cssPosition[pos].prod100 = parseFloat(grDefaultFranchiseModel.getValue('u_100prod'));
									data.cssPosition[pos].prod85 = parseFloat(grDefaultFranchiseModel.getValue('u_100prod')) * 0.85;
									break;

								case 'Ops & Ed':
									pos = CallbackToFindPosition(data.opsPosition, category);
									data.opsPosition[pos].prod100 = parseFloat(grDefaultFranchiseModel.getValue('u_100prod'));
									data.opsPosition[pos].prod85 = parseFloat(grDefaultFranchiseModel.getValue('u_100prod')) * 0.85;
									break;

								case 'Gov\'t Affairs':
									pos = CallbackToFindPosition(data.govPosition, category);
									data.govPosition[pos].prod100 = parseFloat(grDefaultFranchiseModel.getValue('u_100prod'));
									data.govPosition[pos].prod85 = parseFloat(grDefaultFranchiseModel.getValue('u_100prod')) * 0.85;
									break;

								case 'Corp Dev & BT':
									pos = CallbackToFindPosition(data.corpPosition, category);
									data.corpPosition[pos].prod100 = parseFloat(grDefaultFranchiseModel.getValue('u_100prod'));
									data.corpPosition[pos].prod85 = parseFloat(grDefaultFranchiseModel.getValue('u_100prod')) * 0.85;
									break;
							}
						}

						data.ethiconWF2018 = 0;
						data.ethiconWF2019 = 0;
						data.ethiconWF2020 = 0;
						data.ethiconWF2021 = 0;

						if (data.ethicon.length > 0) {
							data.ethiconRevGrowth2019 = (data.revenueEth2019 - data.revenueEth2018) * 1000;
							data.ethiconRevGrowth2020 = (data.revenueEth2020 - data.revenueEth2019) * 1000;
							data.ethiconRevGrowth2021 = (data.revenueEth2021 - data.revenueEth2020) * 1000;
							data.ethiconRevGrowth2022 = (data.revenueEth2022 - data.revenueEth2021) * 1000;

							for (var i = 0; i < data.ethicon.length; i++) {
								if (data.ethicon[i].sub_function == 'Selling MD&D' && data.ethicon[i].commissions == 'true') {
									data.ethicon[i].hc2018 = Math.round(((data.ethiconRevGrowth2019 * (data.ethicon[i].rev_percent)) / data.ethicon[i].avg_quota) * 1.15);
									data.ethicon[i].hc2019 = Math.round(((data.ethiconRevGrowth2020 * (data.ethicon[i].rev_percent)) / data.ethicon[i].avg_quota) * 1.15);
									data.ethicon[i].hc2020 = Math.round(((data.ethiconRevGrowth2021 * (data.ethicon[i].rev_percent)) / data.ethicon[i].avg_quota) * 1.15);
									data.ethicon[i].hc2021 = Math.round(((data.ethiconRevGrowth2022 * (data.ethicon[i].rev_percent)) / data.ethicon[i].avg_quota) * 1.15);

									if (!isNaN(data.ethicon[i].distribution)) {
										data.ethicon[i].hc2018 = Math.round(data.ethicon[i].hc2018 * data.ethicon[i].distribution);
										data.ethicon[i].hc2019 = Math.round(data.ethicon[i].hc2019 * data.ethicon[i].distribution);
										data.ethicon[i].hc2020 = Math.round(data.ethicon[i].hc2020 * data.ethicon[i].distribution);
										data.ethicon[i].hc2021 = Math.round(data.ethicon[i].hc2021 * data.ethicon[i].distribution);
									}
								}
								else {
									var subfunction = data.ethicon[i].sub_function;
									var prod85 = parseFloat(CallbackToFindPositionProduction(data.ethPosition, subfunction));

									data.ethicon[i].hc2018 = Math.round((data.ethiconRevGrowth2019 / (prod85 * 1000)) * data.ethicon[i].distribution);
									data.ethicon[i].hc2019 = Math.round((data.ethiconRevGrowth2020 / (prod85 * 1000)) * data.ethicon[i].distribution);
									data.ethicon[i].hc2020 = Math.round((data.ethiconRevGrowth2021 / (prod85 * 1000)) * data.ethicon[i].distribution);
									data.ethicon[i].hc2021 = Math.round((data.ethiconRevGrowth2022 / (prod85 * 1000)) * data.ethicon[i].distribution);
								}

								data.ethicon[i].hcCost2018 = data.ethicon[i].cost * data.ethicon[i].hc2018;
								data.ethicon[i].hcCost2019 = data.ethicon[i].cost * data.ethicon[i].hc2019;
								data.ethicon[i].hcCost2020 = data.ethicon[i].cost * data.ethicon[i].hc2020;
								data.ethicon[i].hcCost2021 = data.ethicon[i].cost * data.ethicon[i].hc2021;

								data.ethiconWF2018 += data.ethicon[i].hcCost2018;
								data.ethiconWF2019 += data.ethicon[i].hcCost2019;
								data.ethiconWF2020 += data.ethicon[i].hcCost2020;
								data.ethiconWF2021 += data.ethicon[i].hcCost2021;
							}
						}

						data.dpsWF2018 = 0;
						data.dpsWF2019 = 0;
						data.dpsWF2020 = 0;
						data.dpsWF2021 = 0;

						if (data.dps.length > 0) {
							data.dpsRevGrowth2019 = (data.revenueDepuy2019 - data.revenueDepuy2018);
							data.dpsRevGrowth2020 = (data.revenueDepuy2020 - data.revenueDepuy2019);
							data.dpsRevGrowth2021 = (data.revenueDepuy2021 - data.revenueDepuy2020);
							data.dpsRevGrowth2022 = (data.revenueDepuy2022 - data.revenueDepuy2021);
				
							for (var i = 0; i < data.dps.length; i++) {
								if (data.dps[i].sub_function == 'Selling MD&D' && data.dps[i].commissions == 'true') {
									data.dps[i].hc2018 = Math.round(((data.dpsRevGrowth2019 * (data.dps[i].rev_percent)) / data.dps[i].avg_quota));
									data.dps[i].hc2019 = Math.round(((data.dpsRevGrowth2020 * (data.dps[i].rev_percent)) / data.dps[i].avg_quota));
									data.dps[i].hc2020 = Math.round(((data.dpsRevGrowth2021 * (data.dps[i].rev_percent)) / data.dps[i].avg_quota));
									data.dps[i].hc2021 = Math.round(((data.dpsRevGrowth2022 * (data.dps[i].rev_percent)) / data.dps[i].avg_quota));

									if (!isNaN(data.dps[i].distribution)) {
										data.dps[i].hc2018 = Math.round(data.dps[i].hc2018 * data.dps[i].distribution);
										data.dps[i].hc2019 = Math.round(data.dps[i].hc2019 * data.dps[i].distribution);
										data.dps[i].hc2020 = Math.round(data.dps[i].hc2020 * data.dps[i].distribution);
										data.dps[i].hc2021 = Math.round(data.dps[i].hc2021 * data.dps[i].distribution);
									}
								}
								else {
									var subfunction = data.dps[i].sub_function;
									var prod85 = parseFloat(CallbackToFindPositionProduction(data.dpsPosition, subfunction));

									data.dps[i].hc2018 = Math.round((data.dpsRevGrowth2019 / (prod85)) * data.dps[i].distribution);
									data.dps[i].hc2019 = Math.round((data.dpsRevGrowth2020 / (prod85)) * data.dps[i].distribution);
									data.dps[i].hc2020 = Math.round((data.dpsRevGrowth2021 / (prod85)) * data.dps[i].distribution);
									data.dps[i].hc2021 = Math.round((data.dpsRevGrowth2022 / (prod85)) * data.dps[i].distribution);
								}

								data.dps[i].hcCost2018 = data.dps[i].cost * data.dps[i].hc2018;
								data.dps[i].hcCost2019 = data.dps[i].cost * data.dps[i].hc2019;
								data.dps[i].hcCost2020 = data.dps[i].cost * data.dps[i].hc2020;
								data.dps[i].hcCost2021 = data.dps[i].cost * data.dps[i].hc2021;

								data.dpsWF2018 += data.dps[i].hcCost2018;
								data.dpsWF2019 += data.dps[i].hcCost2019;
								data.dpsWF2020 += data.dps[i].hcCost2020;
								data.dpsWF2021 += data.dps[i].hcCost2021;
							}
						}

						data.cssWF2018 = 0;
						data.cssWF2019 = 0;
						data.cssWF2020 = 0;
						data.cssWF2021 = 0;

						if (data.css.length > 0) {
							data.cssRevGrowth2019 = (data.revenueCss2019 - data.revenueCss2018);
							data.cssRevGrowth2020 = (data.revenueCss2020 - data.revenueCss2019);
							data.cssRevGrowth2021 = (data.revenueCss2021 - data.revenueCss2020);
							data.cssRevGrowth2022 = (data.revenueCss2022 - data.revenueCss2021);

							for (var i = 0; i < data.css.length; i++) {
								if (data.css[i].sub_function == 'Selling MD&D' && data.css[i].commissions == 'true') {
									data.css[i].hc2018 = Math.round(((data.cssRevGrowth2019 * (data.css[i].rev_percent)) / data.css[i].avg_quota));
									data.css[i].hc2019 = Math.round(((data.cssRevGrowth2020 * (data.css[i].rev_percent)) / data.css[i].avg_quota));
									data.css[i].hc2020 = Math.round(((data.cssRevGrowth2021 * (data.css[i].rev_percent)) / data.css[i].avg_quota));
									data.css[i].hc2021 = Math.round(((data.cssRevGrowth2022 * (data.css[i].rev_percent)) / data.css[i].avg_quota));

									if (!isNaN(data.css[i].distribution)) {
										data.css[i].hc2018 = Math.round(data.css[i].hc2018 * data.css[i].distribution);
										data.css[i].hc2019 = Math.round(data.css[i].hc2019 * data.css[i].distribution);
										data.css[i].hc2020 = Math.round(data.css[i].hc2020 * data.css[i].distribution);
										data.css[i].hc2021 = Math.round(data.css[i].hc2021 * data.css[i].distribution);
									}
								}
								else if (data.css[i].distribution == 0) {
									data.css[i].hc2018 = 0;
									data.css[i].hc2019 = 0;
									data.css[i].hc2020 = 0;
									data.css[i].hc2021 = 0;
								}
								else {
									var subfunction = data.css[i].sub_function;
									var prod85 = parseFloat(CallbackToFindPositionProduction(data.cssPosition, subfunction));

									data.css[i].hc2018 = Math.round((data.cssRevGrowth2019 * 1000 / (prod85)) * data.css[i].distribution);
									data.css[i].hc2019 = Math.round((data.cssRevGrowth2020 * 1000 / (prod85)) * data.css[i].distribution);
									data.css[i].hc2020 = Math.round((data.cssRevGrowth2021 * 1000 / (prod85)) * data.css[i].distribution);
									data.css[i].hc2021 = Math.round((data.cssRevGrowth2022 * 1000 / (prod85)) * data.css[i].distribution);
								}

								data.css[i].hcCost2018 = data.css[i].cost * data.css[i].hc2018;
								data.css[i].hcCost2019 = data.css[i].cost * data.css[i].hc2019;
								data.css[i].hcCost2020 = data.css[i].cost * data.css[i].hc2020;
								data.css[i].hcCost2021 = data.css[i].cost * data.css[i].hc2021;

								data.cssWF2018 += data.css[i].hcCost2018;
								data.cssWF2019 += data.css[i].hcCost2019;
								data.cssWF2020 += data.css[i].hcCost2020;
								data.cssWF2021 += data.css[i].hcCost2021;
							}
						}

						data.opsWF2018 = 0;
						data.opsWF2019 = 0;
						data.opsWF2020 = 0;
						data.opsWF2021 = 0;

						if (data.ops.length > 0) {
							data.opsRevGrowth2019 = data.revenueOps2019;
							data.opsRevGrowth2020 = data.revenueOps2020;
							data.opsRevGrowth2021 = data.revenueOps2021;
							data.opsRevGrowth2022 = data.revenueOps2022;

							for (var i = 0; i < data.ops.length; i++) {
								var subfunction = data.ops[i].sub_function;
								var prod85 = parseFloat(CallbackToFindPositionProduction(data.opsPosition, subfunction));

								data.ops[i].hc2018 = Math.round(((data.opsRevGrowth2019 * 1000) / prod85) * data.ops[i].distribution);
								data.ops[i].hc2019 = Math.round(((data.opsRevGrowth2020 * 1000) / prod85) * data.ops[i].distribution);
								data.ops[i].hc2020 = Math.round(((data.opsRevGrowth2021 * 1000) / prod85) * data.ops[i].distribution);
								data.ops[i].hc2021 = Math.round(((data.opsRevGrowth2022 * 1000) / prod85) * data.ops[i].distribution);

								data.ops[i].hcCost2018 = data.ops[i].cost * data.ops[i].hc2018;
								data.ops[i].hcCost2019 = data.ops[i].cost * data.ops[i].hc2019;
								data.ops[i].hcCost2020 = data.ops[i].cost * data.ops[i].hc2020;
								data.ops[i].hcCost2021 = data.ops[i].cost * data.ops[i].hc2021;

								data.opsWF2018 += data.ops[i].hc2018;
								data.opsWF2019 += data.ops[i].hcCost2019;
								data.opsWF2020 += data.ops[i].hcCost2020;
								data.opsWF2021 += data.ops[i].hcCost2021;
							}
						}

						data.govWF2018 = 0;
						data.govWF2019 = 0;
						data.govWF2020 = 0;
						data.govWF2021 = 0;

						if (data.gov.length > 0) {
							data.govRevGrowth2019 = data.revenueGov2019;
							data.govRevGrowth2020 = data.revenueGov2020;
							data.govRevGrowth2021 = data.revenueGov2021;
							data.govRevGrowth2022 = data.revenueGov2022;

							for (var i = 0; i < data.gov.length; i++) {
								var subfunction = data.gov[i].sub_function;
								var prod85 = parseFloat(CallbackToFindPositionProduction(data.govPosition, subfunction));

								data.gov[i].hc2018 = Math.round(((data.govRevGrowth2019 * 1000) / prod85) * data.gov[i].distribution);
								data.gov[i].hc2019 = Math.round(((data.govRevGrowth2020 * 1000) / prod85) * data.gov[i].distribution);
								data.gov[i].hc2020 = Math.round(((data.govRevGrowth2021 * 1000) / prod85) * data.gov[i].distribution);
								data.gov[i].hc2021 = Math.round(((data.govRevGrowth2022 * 1000) / prod85) * data.gov[i].distribution);

								data.gov[i].hcCost2018 = data.gov[i].cost * data.gov[i].hc2018;
								data.gov[i].hcCost2019 = data.gov[i].cost * data.gov[i].hc2019;
								data.gov[i].hcCost2020 = data.gov[i].cost * data.gov[i].hc2020;
								data.gov[i].hcCost2021 = data.gov[i].cost * data.gov[i].hc2021;

								data.govWF2018 += data.gov[i].hcCost2018;
								data.govWF2019 += data.gov[i].hcCost2019;
								data.govWF2020 += data.gov[i].hcCost2020;
								data.govWF2021 += data.gov[i].hcCost2021;
							}
						}

						data.corpWF2018 = 0;
						data.corpWF2019 = 0;
						data.corpWF2020 = 0;
						data.corpWF2021 = 0;

						if (data.corp.length > 0) {
							data.corpRevGrowth2019 = data.revenueCorp2019;
							data.corpRevGrowth2020 = data.revenueCorp2020;
							data.corpRevGrowth2021 = data.revenueCorp2021;
							data.corpRevGrowth2022 = data.revenueCorp2022;

							for (var i = 0; i < data.corp.length; i++) {
								var subfunction = data.corp[i].sub_function;
								var prod85 = parseFloat(CallbackToFindPositionProduction(data.corpPosition, subfunction));

								data.corp[i].hc2018 = Math.round(((data.corpRevGrowth2019 * 1000) / prod85) * data.corp[i].distribution);
								data.corp[i].hc2019 = Math.round(((data.corpRevGrowth2020 * 1000) / prod85) * data.corp[i].distribution);
								data.corp[i].hc2020 = Math.round(((data.corpRevGrowth2021 * 1000) / prod85) * data.corp[i].distribution);
								data.corp[i].hc2021 = Math.round(((data.corpRevGrowth2022 * 1000) / prod85) * data.corp[i].distribution);

								data.corp[i].hcCost2018 = data.corp[i].cost * data.corp[i].hc2018;
								data.corp[i].hcCost2019 = data.corp[i].cost * data.corp[i].hc2019;
								data.corp[i].hcCost2020 = data.corp[i].cost * data.corp[i].hc2020;
								data.corp[i].hcCost2021 = data.corp[i].cost * data.corp[i].hc2021;

								data.corpWF2018 += data.corp[i].hcCost2018;
								data.corpWF2019 += data.corp[i].hcCost2019;
								data.corpWF2020 += data.corp[i].hcCost2020;
								data.corpWF2021 += data.corp[i].hcCost2021;
							}
						}

						// Total up Additional Workforce for Summary Table
						data.addWF2018 = data.ethiconWF2018 + data.dpsWF2018 + data.cssWF2018 + data.opsWF2018 + data.govWF2018 + data.corpWF2018;
						data.addWF2019 = data.ethiconWF2019 + data.dpsWF2019 + data.cssWF2019 + data.opsWF2019 + data.govWF2019 + data.corpWF2019;
						data.addWF2020 = data.ethiconWF2020 + data.dpsWF2020 + data.cssWF2020 + data.opsWF2020 + data.govWF2020 + data.corpWF2020;
						data.addWF2021 = data.ethiconWF2021 + data.dpsWF2021 + data.cssWF2021 + data.opsWF2021 + data.govWF2021 + data.corpWF2021;

						data.totalWF2018 = data.wfCurrent + parseFloat(data.addWF2018);
						data.totalWF2019 = data.totalWF2018 + parseFloat(data.addWF2019);
						data.totalWF2020 = data.totalWF2019 + parseFloat(data.addWF2020);
						data.totalWF2021 = data.totalWF2020 + parseFloat(data.addWF2021);

						data.wfcPofOpex2018 = data.totalWF2018 / data.opexN2018 * 100;
						data.wfcPofOpex2019 = data.totalWF2019 / data.opexN2019 * 100;
						data.wfcPofOpex2020 = data.totalWF2020 / data.opexN2020 * 100;
						data.wfcPofOpex2021 = data.totalWF2021 / data.opexN2021 * 100;

						data.totalHCcurrent = data.ethhcactual + data.dpshcactual + data.csshcactual + data.opshcactual + data.govhcactual + data.corphcactual;
						data.totalHC2018 = data.ethhc2018 + data.dpshc2018 + data.csshc2018 + data.opshc2018 + data.govhc2018 + data.corphc2018;
						data.totalHC2019 = data.ethhc2019 + data.dpshc2019 + data.csshc2019 + data.opshc2019 + data.govhc2019 + data.corphc2019;
						data.totalHC2020 = data.ethhc2020 + data.dpshc2020 + data.csshc2020 + data.opshc2020 + data.govhc2020 + data.corphc2020;
						data.totalHC2021 = data.ethhc2021 + data.dpshc2021 + data.csshc2021 + data.opshc2021 + data.govhc2021 + data.corphc2021;
						
						data.working = 'Your Default User';
						gs.addInfoMessage("Opened Default User Model.");
					}
					else {
						gs.addErrorMessage("You do not currently have a saved Default User Model");
					}
					break;

				case 'draft':
					// This button will load your saved draft user model
					var grDraftUserModel = new GlideRecord('u_user_models');
					grDraftUserModel.addQuery('u_user', gs.getUserID());
					grDraftUserModel.addQuery('u_default', 'false');
					grDraftUserModel.query();
					
					if (grDraftUserModel.next()) {
						data.userModel_sys_id = grDraftUserModel.getUniqueValue();
						data.distributionCss = parseFloat(grDraftUserModel.getValue('u_distribution_css'));
						data.distributionDepuy = parseFloat(grDraftUserModel.getValue('u_distribution_depuy'));
						data.distributionEth = parseFloat(grDraftUserModel.getValue('u_distribution_ethicon'));
						data.opexInc = parseFloat(grDraftUserModel.getValue('u_opex_inc'));
						data.revenueGrowth2019 = parseFloat(grDraftUserModel.getValue('u_rev_growth_2019'));
						data.revenueGrowth2020 = parseFloat(grDraftUserModel.getValue('u_rev_growth_2020'));
						data.revenueGrowth2021 = parseFloat(grDraftUserModel.getValue('u_rev_growth_2021'));
						data.revenueGrowth2022 = parseFloat(grDraftUserModel.getValue('u_rev_growth_2022'));

						// Non-input data from existing page
						data.revenue2018 = parseFloat(input.revenue2018);
						data.wfCurrent = parseFloat(input.wfCurrent);
						data.opex2018 = parseFloat(input.opex2018);
						
						// Now to calculate other data values
						data.revenue2019 = data.revenue2018 * (1 + data.revenueGrowth2019 / 100);
						data.revenue2020 = data.revenue2019 * (1 + data.revenueGrowth2020 / 100);
						data.revenue2021 = data.revenue2020 * (1 + data.revenueGrowth2021 / 100);
						data.revenue2022 = data.revenue2021 * (1 + data.revenueGrowth2022 / 100);

						data.revenueCss2018 = data.revenue2018 * data.distributionCss / 100;
						data.revenueDepuy2018 = data.revenue2018 * data.distributionDepuy / 100;
						data.revenueEth2018 = data.revenue2018 * data.distributionEth / 100;

						data.revenueCss2019 = data.revenue2019 * data.distributionCss / 100;
						data.revenueDepuy2019 = data.revenue2019 * data.distributionDepuy / 100;
						data.revenueEth2019 = data.revenue2019 * data.distributionEth / 100;
						data.revenueOps2019 = data.revenue2019 - data.revenue2018;
						data.revenueGov2019 = data.revenue2019 - data.revenue2018;
						data.revenueCorp2019 = data.revenue2019 - data.revenue2018;

						data.revenueCss2020 = data.revenue2020 * data.distributionCss / 100;
						data.revenueDepuy2020 = data.revenue2020 * data.distributionDepuy / 100;
						data.revenueEth2020 = data.revenue2020 * data.distributionEth / 100;
						data.revenueOps2020 = data.revenue2020 - data.revenue2019;
						data.revenueGov2020 = data.revenue2020 - data.revenue2019;
						data.revenueCorp2020 = data.revenue2020 - data.revenue2019;

						data.revenueCss2021 = data.revenue2021 * data.distributionCss / 100;
						data.revenueDepuy2021 = data.revenue2021 * data.distributionDepuy / 100;
						data.revenueEth2021 = data.revenue2021 * data.distributionEth / 100;
						data.revenueOps2021 = data.revenue2021 - data.revenue2020;
						data.revenueGov2021 = data.revenue2021 - data.revenue2020;
						data.revenueCorp2021 = data.revenue2021 - data.revenue2020;

						data.revenueCss2022 = data.revenue2022 * data.distributionCss / 100;
						data.revenueDepuy2022 = data.revenue2022 * data.distributionDepuy / 100;
						data.revenueEth2022 = data.revenue2022 * data.distributionEth / 100;
						data.revenueOps2022 = data.revenue2022 - data.revenue2021;
						data.revenueGov2022 = data.revenue2022 - data.revenue2021;
						data.revenueCorp2022 = data.revenue2022 - data.revenue2021;

						data.opex2019 = data.opex2018 * (1 + data.opexInc / 100);
						data.opex2020 = data.opex2019 * (1 + data.opexInc / 100);
						data.opex2021 = data.opex2020 * (1 + data.opexInc / 100);
						data.opex2022 = data.opex2021 * (1 + data.opexInc / 100);

						data.opexN2018 = data.revenue2018 * data.opex2018 * 10;
						data.opexN2019 = data.revenue2019 * data.opex2019 * 10;
						data.opexN2020 = data.revenue2020 * data.opex2020 * 10;
						data.opexN2021 = data.revenue2021 * data.opex2021 * 10;
						data.opexN2022 = data.revenue2022 * data.opex2022 * 10;

						data.addWF2018 = 0;
						data.addWF2019 = 0;
						data.addWF2020 = 0;
						data.addWF2021 = 0;

						// Pull saved Franchise data
						var parent_sysid = grDraftUserModel.getUniqueValue();
						var grDraftFranchiseModel = new GlideRecord('u_user_franchise_model');
						grDraftFranchiseModel.addQuery('u_parent', parent_sysid);
						grDraftFranchiseModel.query();

						while (grDraftFranchiseModel.next()) {
							var franchise = grDraftFranchiseModel.getDisplayValue('u_franchise');
							var category = grDraftFranchiseModel.getDisplayValue('u_category');
							var pos = -1;

							switch (franchise) {
								case 'Ethicon':
									pos = CallbackToFindPosition(data.ethPosition, category);
									data.ethPosition[pos].prod100 = parseFloat(grDraftFranchiseModel.getValue('u_100prod'));
									data.ethPosition[pos].prod85 = parseFloat(grDraftFranchiseModel.getValue('u_100prod')) * 0.85;
									break;

								case 'DePuy Synthes':
									pos = CallbackToFindPosition(data.dssPosition, category);
									data.dssPosition[pos].prod100 = parseFloat(grDraftFranchiseModel.getValue('u_100prod'));
									data.dssPosition[pos].prod85 = parseFloat(grDraftFranchiseModel.getValue('u_100prod')) * 0.85;
									break;

								case 'CSS':
									pos = CallbackToFindPosition(data.cssPosition, category);
									data.cssPosition[pos].prod100 = parseFloat(grDraftFranchiseModel.getValue('u_100prod'));
									data.cssPosition[pos].prod85 = parseFloat(grDraftFranchiseModel.getValue('u_100prod')) * 0.85;
									break;

								case 'Ops & Ed':
									pos = CallbackToFindPosition(data.opsPosition, category);
									data.opsPosition[pos].prod100 = parseFloat(grDraftFranchiseModel.getValue('u_100prod'));
									data.opsPosition[pos].prod85 = parseFloat(grDraftFranchiseModel.getValue('u_100prod')) * 0.85;
									break;

								case 'Gov\'t Affairs':
									pos = CallbackToFindPosition(data.govPosition, category);
									data.govPosition[pos].prod100 = parseFloat(grDraftFranchiseModel.getValue('u_100prod'));
									data.govPosition[pos].prod85 = parseFloat(grDraftFranchiseModel.getValue('u_100prod')) * 0.85;
									break;

								case 'Corp Dev & BT':
									pos = CallbackToFindPosition(data.corpPosition, category);
									data.corpPosition[pos].prod100 = parseFloat(grDraftFranchiseModel.getValue('u_100prod'));
									data.corpPosition[pos].prod85 = parseFloat(grDraftFranchiseModel.getValue('u_100prod')) * 0.85;
									break;
							}
						}

						data.ethiconWF2018 = 0;
						data.ethiconWF2019 = 0;
						data.ethiconWF2020 = 0;
						data.ethiconWF2021 = 0;

						if (data.ethicon.length > 0) {
							data.ethiconRevGrowth2019 = (data.revenueEth2019 - data.revenueEth2018) * 1000;
							data.ethiconRevGrowth2020 = (data.revenueEth2020 - data.revenueEth2019) * 1000;
							data.ethiconRevGrowth2021 = (data.revenueEth2021 - data.revenueEth2020) * 1000;
							data.ethiconRevGrowth2022 = (data.revenueEth2022 - data.revenueEth2021) * 1000;

							for (var i = 0; i < data.ethicon.length; i++) {
								if (data.ethicon[i].sub_function == 'Selling MD&D' && data.ethicon[i].commissions == 'true') {
									data.ethicon[i].hc2018 = Math.round(((data.ethiconRevGrowth2019 * (data.ethicon[i].rev_percent)) / data.ethicon[i].avg_quota) * 1.15);
									data.ethicon[i].hc2019 = Math.round(((data.ethiconRevGrowth2020 * (data.ethicon[i].rev_percent)) / data.ethicon[i].avg_quota) * 1.15);
									data.ethicon[i].hc2020 = Math.round(((data.ethiconRevGrowth2021 * (data.ethicon[i].rev_percent)) / data.ethicon[i].avg_quota) * 1.15);
									data.ethicon[i].hc2021 = Math.round(((data.ethiconRevGrowth2022 * (data.ethicon[i].rev_percent)) / data.ethicon[i].avg_quota) * 1.15);

									if (!isNaN(data.ethicon[i].distribution)) {
										data.ethicon[i].hc2018 = Math.round(data.ethicon[i].hc2018 * data.ethicon[i].distribution);
										data.ethicon[i].hc2019 = Math.round(data.ethicon[i].hc2019 * data.ethicon[i].distribution);
										data.ethicon[i].hc2020 = Math.round(data.ethicon[i].hc2020 * data.ethicon[i].distribution);
										data.ethicon[i].hc2021 = Math.round(data.ethicon[i].hc2021 * data.ethicon[i].distribution);
									}
								}
								else {
									var subfunction = data.ethicon[i].sub_function;
									var prod85 = parseFloat(CallbackToFindPositionProduction(data.ethPosition, subfunction));

									data.ethicon[i].hc2018 = Math.round((data.ethiconRevGrowth2019 / (prod85 * 1000)) * data.ethicon[i].distribution);
									data.ethicon[i].hc2019 = Math.round((data.ethiconRevGrowth2020 / (prod85 * 1000)) * data.ethicon[i].distribution);
									data.ethicon[i].hc2020 = Math.round((data.ethiconRevGrowth2021 / (prod85 * 1000)) * data.ethicon[i].distribution);
									data.ethicon[i].hc2021 = Math.round((data.ethiconRevGrowth2022 / (prod85 * 1000)) * data.ethicon[i].distribution);
								}

								data.ethicon[i].hcCost2018 = data.ethicon[i].cost * data.ethicon[i].hc2018;
								data.ethicon[i].hcCost2019 = data.ethicon[i].cost * data.ethicon[i].hc2019;
								data.ethicon[i].hcCost2020 = data.ethicon[i].cost * data.ethicon[i].hc2020;
								data.ethicon[i].hcCost2021 = data.ethicon[i].cost * data.ethicon[i].hc2021;

								data.ethiconWF2018 += data.ethicon[i].hcCost2018;
								data.ethiconWF2019 += data.ethicon[i].hcCost2019;
								data.ethiconWF2020 += data.ethicon[i].hcCost2020;
								data.ethiconWF2021 += data.ethicon[i].hcCost2021;
							}
						}

						data.dpsWF2018 = 0;
						data.dpsWF2019 = 0;
						data.dpsWF2020 = 0;
						data.dpsWF2021 = 0;

						if (data.dps.length > 0) {
							data.dpsRevGrowth2019 = (data.revenueDepuy2019 - data.revenueDepuy2018);
							data.dpsRevGrowth2020 = (data.revenueDepuy2020 - data.revenueDepuy2019);
							data.dpsRevGrowth2021 = (data.revenueDepuy2021 - data.revenueDepuy2020);
							data.dpsRevGrowth2022 = (data.revenueDepuy2022 - data.revenueDepuy2021);
				
							for (var i = 0; i < data.dps.length; i++) {
								if (data.dps[i].sub_function == 'Selling MD&D' && data.dps[i].commissions == 'true') {
									data.dps[i].hc2018 = Math.round(((data.dpsRevGrowth2019 * (data.dps[i].rev_percent)) / data.dps[i].avg_quota));
									data.dps[i].hc2019 = Math.round(((data.dpsRevGrowth2020 * (data.dps[i].rev_percent)) / data.dps[i].avg_quota));
									data.dps[i].hc2020 = Math.round(((data.dpsRevGrowth2021 * (data.dps[i].rev_percent)) / data.dps[i].avg_quota));
									data.dps[i].hc2021 = Math.round(((data.dpsRevGrowth2022 * (data.dps[i].rev_percent)) / data.dps[i].avg_quota));

									if (!isNaN(data.dps[i].distribution)) {
										data.dps[i].hc2018 = Math.round(data.dps[i].hc2018 * data.dps[i].distribution);
										data.dps[i].hc2019 = Math.round(data.dps[i].hc2019 * data.dps[i].distribution);
										data.dps[i].hc2020 = Math.round(data.dps[i].hc2020 * data.dps[i].distribution);
										data.dps[i].hc2021 = Math.round(data.dps[i].hc2021 * data.dps[i].distribution);
									}
								}
								else {
									var subfunction = data.dps[i].sub_function;
									var prod85 = parseFloat(CallbackToFindPositionProduction(data.dpsPosition, subfunction));

									data.dps[i].hc2018 = Math.round((data.dpsRevGrowth2019 / (prod85)) * data.dps[i].distribution);
									data.dps[i].hc2019 = Math.round((data.dpsRevGrowth2020 / (prod85)) * data.dps[i].distribution);
									data.dps[i].hc2020 = Math.round((data.dpsRevGrowth2021 / (prod85)) * data.dps[i].distribution);
									data.dps[i].hc2021 = Math.round((data.dpsRevGrowth2022 / (prod85)) * data.dps[i].distribution);
								}

								data.dps[i].hcCost2018 = data.dps[i].cost * data.dps[i].hc2018;
								data.dps[i].hcCost2019 = data.dps[i].cost * data.dps[i].hc2019;
								data.dps[i].hcCost2020 = data.dps[i].cost * data.dps[i].hc2020;
								data.dps[i].hcCost2021 = data.dps[i].cost * data.dps[i].hc2021;

								data.dpsWF2018 += data.dps[i].hcCost2018;
								data.dpsWF2019 += data.dps[i].hcCost2019;
								data.dpsWF2020 += data.dps[i].hcCost2020;
								data.dpsWF2021 += data.dps[i].hcCost2021;
							}
						}

						data.cssWF2018 = 0;
						data.cssWF2019 = 0;
						data.cssWF2020 = 0;
						data.cssWF2021 = 0;

						if (data.css.length > 0) {
							data.cssRevGrowth2019 = (data.revenueCss2019 - data.revenueCss2018);
							data.cssRevGrowth2020 = (data.revenueCss2020 - data.revenueCss2019);
							data.cssRevGrowth2021 = (data.revenueCss2021 - data.revenueCss2020);
							data.cssRevGrowth2022 = (data.revenueCss2022 - data.revenueCss2021);

							for (var i = 0; i < data.css.length; i++) {
								if (data.css[i].sub_function == 'Selling MD&D' && data.css[i].commissions == 'true') {
									data.css[i].hc2018 = Math.round(((data.cssRevGrowth2019 * (data.css[i].rev_percent)) / data.css[i].avg_quota));
									data.css[i].hc2019 = Math.round(((data.cssRevGrowth2020 * (data.css[i].rev_percent)) / data.css[i].avg_quota));
									data.css[i].hc2020 = Math.round(((data.cssRevGrowth2021 * (data.css[i].rev_percent)) / data.css[i].avg_quota));
									data.css[i].hc2021 = Math.round(((data.cssRevGrowth2022 * (data.css[i].rev_percent)) / data.css[i].avg_quota));

									if (!isNaN(data.css[i].distribution)) {
										data.css[i].hc2018 = Math.round(data.css[i].hc2018 * data.css[i].distribution);
										data.css[i].hc2019 = Math.round(data.css[i].hc2019 * data.css[i].distribution);
										data.css[i].hc2020 = Math.round(data.css[i].hc2020 * data.css[i].distribution);
										data.css[i].hc2021 = Math.round(data.css[i].hc2021 * data.css[i].distribution);
									}
								}
								else if (data.css[i].distribution == 0) {
									data.css[i].hc2018 = 0;
									data.css[i].hc2019 = 0;
									data.css[i].hc2020 = 0;
									data.css[i].hc2021 = 0;
								}
								else {
									var subfunction = data.css[i].sub_function;
									var prod85 = parseFloat(CallbackToFindPositionProduction(data.cssPosition, subfunction));

									data.css[i].hc2018 = Math.round((data.cssRevGrowth2019 * 1000 / (prod85)) * data.css[i].distribution);
									data.css[i].hc2019 = Math.round((data.cssRevGrowth2020 * 1000 / (prod85)) * data.css[i].distribution);
									data.css[i].hc2020 = Math.round((data.cssRevGrowth2021 * 1000 / (prod85)) * data.css[i].distribution);
									data.css[i].hc2021 = Math.round((data.cssRevGrowth2022 * 1000 / (prod85)) * data.css[i].distribution);
								}

								data.css[i].hcCost2018 = data.css[i].cost * data.css[i].hc2018;
								data.css[i].hcCost2019 = data.css[i].cost * data.css[i].hc2019;
								data.css[i].hcCost2020 = data.css[i].cost * data.css[i].hc2020;
								data.css[i].hcCost2021 = data.css[i].cost * data.css[i].hc2021;

								data.cssWF2018 += data.css[i].hcCost2018;
								data.cssWF2019 += data.css[i].hcCost2019;
								data.cssWF2020 += data.css[i].hcCost2020;
								data.cssWF2021 += data.css[i].hcCost2021;
							}
						}

						data.opsWF2018 = 0;
						data.opsWF2019 = 0;
						data.opsWF2020 = 0;
						data.opsWF2021 = 0;

						if (data.ops.length > 0) {
							data.opsRevGrowth2019 = data.revenueOps2019;
							data.opsRevGrowth2020 = data.revenueOps2020;
							data.opsRevGrowth2021 = data.revenueOps2021;
							data.opsRevGrowth2022 = data.revenueOps2022;

							for (var i = 0; i < data.ops.length; i++) {
								var subfunction = data.ops[i].sub_function;
								var prod85 = parseFloat(CallbackToFindPositionProduction(data.opsPosition, subfunction));

								data.ops[i].hc2018 = Math.round(((data.opsRevGrowth2019 * 1000) / prod85) * data.ops[i].distribution);
								data.ops[i].hc2019 = Math.round(((data.opsRevGrowth2020 * 1000) / prod85) * data.ops[i].distribution);
								data.ops[i].hc2020 = Math.round(((data.opsRevGrowth2021 * 1000) / prod85) * data.ops[i].distribution);
								data.ops[i].hc2021 = Math.round(((data.opsRevGrowth2022 * 1000) / prod85) * data.ops[i].distribution);

								data.ops[i].hcCost2018 = data.ops[i].cost * data.ops[i].hc2018;
								data.ops[i].hcCost2019 = data.ops[i].cost * data.ops[i].hc2019;
								data.ops[i].hcCost2020 = data.ops[i].cost * data.ops[i].hc2020;
								data.ops[i].hcCost2021 = data.ops[i].cost * data.ops[i].hc2021;

								data.opsWF2018 += data.ops[i].hc2018;
								data.opsWF2019 += data.ops[i].hcCost2019;
								data.opsWF2020 += data.ops[i].hcCost2020;
								data.opsWF2021 += data.ops[i].hcCost2021;
							}
						}

						data.govWF2018 = 0;
						data.govWF2019 = 0;
						data.govWF2020 = 0;
						data.govWF2021 = 0;

						if (data.gov.length > 0) {
							data.govRevGrowth2019 = data.revenueGov2019;
							data.govRevGrowth2020 = data.revenueGov2020;
							data.govRevGrowth2021 = data.revenueGov2021;
							data.govRevGrowth2022 = data.revenueGov2022;

							for (var i = 0; i < data.gov.length; i++) {
								var subfunction = data.gov[i].sub_function;
								var prod85 = parseFloat(CallbackToFindPositionProduction(data.govPosition, subfunction));

								data.gov[i].hc2018 = Math.round(((data.govRevGrowth2019 * 1000) / prod85) * data.gov[i].distribution);
								data.gov[i].hc2019 = Math.round(((data.govRevGrowth2020 * 1000) / prod85) * data.gov[i].distribution);
								data.gov[i].hc2020 = Math.round(((data.govRevGrowth2021 * 1000) / prod85) * data.gov[i].distribution);
								data.gov[i].hc2021 = Math.round(((data.govRevGrowth2022 * 1000) / prod85) * data.gov[i].distribution);

								data.gov[i].hcCost2018 = data.gov[i].cost * data.gov[i].hc2018;
								data.gov[i].hcCost2019 = data.gov[i].cost * data.gov[i].hc2019;
								data.gov[i].hcCost2020 = data.gov[i].cost * data.gov[i].hc2020;
								data.gov[i].hcCost2021 = data.gov[i].cost * data.gov[i].hc2021;

								data.govWF2018 += data.gov[i].hcCost2018;
								data.govWF2019 += data.gov[i].hcCost2019;
								data.govWF2020 += data.gov[i].hcCost2020;
								data.govWF2021 += data.gov[i].hcCost2021;
							}
						}

						data.corpWF2018 = 0;
						data.corpWF2019 = 0;
						data.corpWF2020 = 0;
						data.corpWF2021 = 0;

						if (data.corp.length > 0) {
							data.corpRevGrowth2019 = data.revenueCorp2019;
							data.corpRevGrowth2020 = data.revenueCorp2020;
							data.corpRevGrowth2021 = data.revenueCorp2021;
							data.corpRevGrowth2022 = data.revenueCorp2022;

							for (var i = 0; i < data.corp.length; i++) {
								var subfunction = data.corp[i].sub_function;
								var prod85 = parseFloat(CallbackToFindPositionProduction(data.corpPosition, subfunction));

								data.corp[i].hc2018 = Math.round(((data.corpRevGrowth2019 * 1000) / prod85) * data.corp[i].distribution);
								data.corp[i].hc2019 = Math.round(((data.corpRevGrowth2020 * 1000) / prod85) * data.corp[i].distribution);
								data.corp[i].hc2020 = Math.round(((data.corpRevGrowth2021 * 1000) / prod85) * data.corp[i].distribution);
								data.corp[i].hc2021 = Math.round(((data.corpRevGrowth2022 * 1000) / prod85) * data.corp[i].distribution);

								data.corp[i].hcCost2018 = data.corp[i].cost * data.corp[i].hc2018;
								data.corp[i].hcCost2019 = data.corp[i].cost * data.corp[i].hc2019;
								data.corp[i].hcCost2020 = data.corp[i].cost * data.corp[i].hc2020;
								data.corp[i].hcCost2021 = data.corp[i].cost * data.corp[i].hc2021;

								data.corpWF2018 += data.corp[i].hcCost2018;
								data.corpWF2019 += data.corp[i].hcCost2019;
								data.corpWF2020 += data.corp[i].hcCost2020;
								data.corpWF2021 += data.corp[i].hcCost2021;
							}
						}

						// Total up Additional Workforce for Summary Table
						data.addWF2018 = data.ethiconWF2018 + data.dpsWF2018 + data.cssWF2018 + data.opsWF2018 + data.govWF2018 + data.corpWF2018;
						data.addWF2019 = data.ethiconWF2019 + data.dpsWF2019 + data.cssWF2019 + data.opsWF2019 + data.govWF2019 + data.corpWF2019;
						data.addWF2020 = data.ethiconWF2020 + data.dpsWF2020 + data.cssWF2020 + data.opsWF2020 + data.govWF2020 + data.corpWF2020;
						data.addWF2021 = data.ethiconWF2021 + data.dpsWF2021 + data.cssWF2021 + data.opsWF2021 + data.govWF2021 + data.corpWF2021;

						data.totalWF2018 = data.wfCurrent + parseFloat(data.addWF2018);
						data.totalWF2019 = data.totalWF2018 + parseFloat(data.addWF2019);
						data.totalWF2020 = data.totalWF2019 + parseFloat(data.addWF2020);
						data.totalWF2021 = data.totalWF2020 + parseFloat(data.addWF2021);

						data.wfcPofOpex2018 = data.totalWF2018 / data.opexN2018 * 100;
						data.wfcPofOpex2019 = data.totalWF2019 / data.opexN2019 * 100;
						data.wfcPofOpex2020 = data.totalWF2020 / data.opexN2020 * 100;
						data.wfcPofOpex2021 = data.totalWF2021 / data.opexN2021 * 100;

						data.totalHCcurrent = data.ethhcactual + data.dpshcactual + data.csshcactual + data.opshcactual + data.govhcactual + data.corphcactual;
						data.totalHC2018 = data.ethhc2018 + data.dpshc2018 + data.csshc2018 + data.opshc2018 + data.govhc2018 + data.corphc2018;
						data.totalHC2019 = data.ethhc2019 + data.dpshc2019 + data.csshc2019 + data.opshc2019 + data.govhc2019 + data.corphc2019;
						data.totalHC2020 = data.ethhc2020 + data.dpshc2020 + data.csshc2020 + data.opshc2020 + data.govhc2020 + data.corphc2020;
						data.totalHC2021 = data.ethhc2021 + data.dpshc2021 + data.csshc2021 + data.opshc2021 + data.govhc2021 + data.corphc2021;
						
						data.working = 'Your Draft User';
						gs.addInfoMessage("Opened Draft User Model.");
					}
					else {
						gs.addErrorMessage("You do not currently have a saved Draft User Model");
					}
					break;

				case 'save':
					// This button will save the model you currently have as your draft
					// But, first we remove your other saved draft, if it exists
					var oldDraft_sys_id = '';
					var grOldDraftUserModel = new GlideRecord('u_user_models');
					grOldDraftUserModel.addQuery('u_user', gs.getUserID());
					grOldDraftUserModel.addQuery('u_default', 'false');
					grOldDraftUserModel.query();
					
					if (grOldDefaultUserModel.next()) {
						var grOldDefaultFranchiseModels = new GlideRecord('u_user_franchise_model');
						grOldDefaultFranchiseModels.addQuery('u_parent', oldDefault_sys_id);
						
						while (grOldDefaultFranchiseModels.next()) {
							grOldDefaultFranchiseModels.deleteRecord();
						}

						oldDefault_sys_id = grOldDraftUserModel.getUniqueValue();
						grOldDefaultUserModel.deleteRecord();
					}
					
					var grNewUserModel = new GlideRecord('u_user_models');
					grNewUserModel.initialize();
					grNewUserModel.setValue('u_distribution_css', input.distributionCss);
					grNewUserModel.setValue('u_distribution_depuy', input.distributionDepuy);
					grNewUserModel.setValue('u_distribution_ethicon', input.distributionEth);
					grNewUserModel.setValue('u_opex_inc', input.opexInc);
					grNewUserModel.setValue('u_rev_growth_2019', input.revenueGrowth2019);
					grNewUserModel.setValue('u_rev_growth_2020', input.revenueGrowth2020);
					grNewUserModel.setValue('u_rev_growth_2021', input.revenueGrowth2021);
					grNewUserModel.setValue('u_rev_growth_2022', input.revenueGrowth2022);
					grNewUserModel.setValue('u_default', 'false');
					grNewUserModel.setValue('u_user', gs.getUserID());
					
					var modelDraftSysId = grNewUserModel.insert();

					// Franchise data
					if (input.ethPosition.length > 0) {
						for (var l = 0; l < input.ethPosition.length; l++) {
							var grNewEthUserModel = new GlideRecord('u_user_franchise_model');
							grNewEthUserModel.initialize();
							grNewEthUserModel.setValue('u_region', 'cd3ae852db486b401d3e51f74b9619dc');
							grNewEthUserModel.setValue('u_franchise', 'cf6e6096db486b401d3e51f74b9619cf');
							grNewEthUserModel.setValue('u_category', input.ethPosition[l].category);
							grNewEthUserModel.setValue('u_100prod', input.ethPosition[l].prod100);
							grNewEthUserModel.setValue('u_parent', modelDraftSysId);
							
							grNewEthUserModel.insert();
						}
					}

					if (input.dpsPosition.length > 0) {
						for (var l = 0; l < input.dpsPosition.length; l++) {
							var grNewEthUserModel = new GlideRecord('u_user_franchise_model');
							grNewEthUserModel.initialize();
							grNewEthUserModel.setValue('u_region', 'cd3ae852db486b401d3e51f74b9619dc');
							grNewEthUserModel.setValue('u_franchise', '825e6896db486b401d3e51f74b961946');
							grNewEthUserModel.setValue('u_category', input.dpsPosition[l].category);
							grNewEthUserModel.setValue('u_100prod', input.dpsPosition[l].prod100);
							grNewEthUserModel.setValue('u_parent', modelDraftSysId);
							
							grNewEthUserModel.insert();
						}
					}

					if (input.cssPosition.length > 0) {
						for (var l = 0; l < input.cssPosition.length; l++) {
							var grNewEthUserModel = new GlideRecord('u_user_franchise_model');
							grNewEthUserModel.initialize();
							grNewEthUserModel.setValue('u_region', 'cd3ae852db486b401d3e51f74b9619dc');
							grNewEthUserModel.setValue('u_franchise', '2d9d6c16db486b401d3e51f74b9619f2');
							grNewEthUserModel.setValue('u_category', input.cssPosition[l].category);
							grNewEthUserModel.setValue('u_100prod', input.cssPosition[l].prod100);
							grNewEthUserModel.setValue('u_parent', modelDraftSysId);
							
							grNewEthUserModel.insert();
						}
					}

					if (input.opsPosition.length > 0) {
						for (var l = 0; l < input.opsPosition.length; l++) {
							var grNewEthUserModel = new GlideRecord('u_user_franchise_model');
							grNewEthUserModel.initialize();
							grNewEthUserModel.setValue('u_region', 'cd3ae852db486b401d3e51f74b9619dc');
							grNewEthUserModel.setValue('u_franchise', '7c70b0d6db486b401d3e51f74b9619c1');
							grNewEthUserModel.setValue('u_category', input.opsPosition[l].category);
							grNewEthUserModel.setValue('u_100prod', input.opsPosition[l].prod100);
							grNewEthUserModel.setValue('u_parent', modelDraftSysId);
							
							grNewEthUserModel.insert();
						}
					}

					if (input.govPosition.length > 0) {
						for (var l = 0; l < input.govPosition.length; l++) {
							var grNewEthUserModel = new GlideRecord('u_user_franchise_model');
							grNewEthUserModel.initialize();
							grNewEthUserModel.setValue('u_region', 'cd3ae852db486b401d3e51f74b9619dc');
							grNewEthUserModel.setValue('u_franchise', 'ca7e20d6db486b401d3e51f74b96198f');
							grNewEthUserModel.setValue('u_category', input.govPosition[l].category);
							grNewEthUserModel.setValue('u_100prod', input.govPosition[l].prod100);
							grNewEthUserModel.setValue('u_parent', modelDraftSysId);
							
							grNewEthUserModel.insert();
						}
					}

					if (input.corpPosition.length > 0) {
						for (var l = 0; l < input.corpPosition.length; l++) {
							var grNewEthUserModel = new GlideRecord('u_user_franchise_model');
							grNewEthUserModel.initialize();
							grNewEthUserModel.setValue('u_region', 'cd3ae852db486b401d3e51f74b9619dc');
							grNewEthUserModel.setValue('u_franchise', 'ea1d2456db486b401d3e51f74b9619a7');
							grNewEthUserModel.setValue('u_category', input.corpPosition[l].category);
							grNewEthUserModel.setValue('u_100prod', input.corpPosition[l].prod100);
							grNewEthUserModel.setValue('u_parent', modelDraftSysId);
							
							grNewEthUserModel.insert();
						}
					}

					data.working = 'Your Draft User';
					gs.addInfoMessage("Saved Draft User Model.");
					break;

				case 'apply':
					// This button will save the model you currently have as your default
					// But, first we remove your other saved draft, if it exists
					var oldDefault_sys_id = '';
					var grOldDefaultUserModel = new GlideRecord('u_user_models');
					grOldDefaultUserModel.addQuery('u_user', gs.getUserID());
					grOldDefaultUserModel.addQuery('u_default', 'true');
					grOldDefaultUserModel.query();
					
					if (grOldDefaultUserModel.next()) {
						var grOldDefaultFranchiseModels = new GlideRecord('u_user_franchise_model');
						grOldDefaultFranchiseModels.addQuery('u_parent', oldDefault_sys_id);
						
						while (grOldDefaultFranchiseModels.next()) {
							grOldDefaultFranchiseModels.deleteRecord();
						}

						oldDefault_sys_id = grOldDraftUserModel.getUniqueValue();
						grOldDefaultUserModel.deleteRecord();
					}
					
					var grNewDefaultUserModel = new GlideRecord('u_user_models');
					grNewDefaultUserModel.initialize();
					grNewDefaultUserModel.setValue('u_distribution_css', input.distributionCss);
					grNewDefaultUserModel.setValue('u_distribution_depuy', input.distributionDepuy);
					grNewDefaultUserModel.setValue('u_distribution_ethicon', input.distributionEth);
					grNewDefaultUserModel.setValue('u_opex_inc', input.opexInc);
					grNewDefaultUserModel.setValue('u_rev_growth_2019', input.revenueGrowth2019);
					grNewDefaultUserModel.setValue('u_rev_growth_2020', input.revenueGrowth2020);
					grNewDefaultUserModel.setValue('u_rev_growth_2021', input.revenueGrowth2021);
					grNewDefaultUserModel.setValue('u_rev_growth_2022', input.revenueGrowth2022);
					grNewDefaultUserModel.setValue('u_default', 'true');
					grNewDefaultUserModel.setValue('u_user', gs.getUserID());
					
					var modelDefaultSysId = grNewDefaultUserModel.insert();

					// Franchise data
					if (input.ethPosition.length > 0) {
						for (var l = 0; l < input.ethPosition.length; l++) {
							var grNewEthUserModel = new GlideRecord('u_user_franchise_model');
							grNewEthUserModel.initialize();
							grNewEthUserModel.setValue('u_region', 'cd3ae852db486b401d3e51f74b9619dc');
							grNewEthUserModel.setValue('u_franchise', 'cf6e6096db486b401d3e51f74b9619cf');
							grNewEthUserModel.setValue('u_category', input.ethPosition[l].category);
							grNewEthUserModel.setValue('u_100prod', input.ethPosition[l].prod100);
							grNewEthUserModel.setValue('u_parent', modelDefaultSysId);
							
							grNewEthUserModel.insert();
						}
					}

					if (input.dpsPosition.length > 0) {
						for (var l = 0; l < input.dpsPosition.length; l++) {
							var grNewEthUserModel = new GlideRecord('u_user_franchise_model');
							grNewEthUserModel.initialize();
							grNewEthUserModel.setValue('u_region', 'cd3ae852db486b401d3e51f74b9619dc');
							grNewEthUserModel.setValue('u_franchise', '825e6896db486b401d3e51f74b961946');
							grNewEthUserModel.setValue('u_category', input.dpsPosition[l].category);
							grNewEthUserModel.setValue('u_100prod', input.dpsPosition[l].prod100);
							grNewEthUserModel.setValue('u_parent', modelDefaultSysId);
							
							grNewEthUserModel.insert();
						}
					}

					if (input.cssPosition.length > 0) {
						for (var l = 0; l < input.cssPosition.length; l++) {
							var grNewEthUserModel = new GlideRecord('u_user_franchise_model');
							grNewEthUserModel.initialize();
							grNewEthUserModel.setValue('u_region', 'cd3ae852db486b401d3e51f74b9619dc');
							grNewEthUserModel.setValue('u_franchise', '2d9d6c16db486b401d3e51f74b9619f2');
							grNewEthUserModel.setValue('u_category', input.cssPosition[l].category);
							grNewEthUserModel.setValue('u_100prod', input.cssPosition[l].prod100);
							grNewEthUserModel.setValue('u_parent', modelDefaultSysId);
							
							grNewEthUserModel.insert();
						}
					}

					if (input.opsPosition.length > 0) {
						for (var l = 0; l < input.opsPosition.length; l++) {
							var grNewEthUserModel = new GlideRecord('u_user_franchise_model');
							grNewEthUserModel.initialize();
							grNewEthUserModel.setValue('u_region', 'cd3ae852db486b401d3e51f74b9619dc');
							grNewEthUserModel.setValue('u_franchise', '7c70b0d6db486b401d3e51f74b9619c1');
							grNewEthUserModel.setValue('u_category', input.opsPosition[l].category);
							grNewEthUserModel.setValue('u_100prod', input.opsPosition[l].prod100);
							grNewEthUserModel.setValue('u_parent', modelDefaultSysId);
							
							grNewEthUserModel.insert();
						}
					}

					if (input.govPosition.length > 0) {
						for (var l = 0; l < input.govPosition.length; l++) {
							var grNewEthUserModel = new GlideRecord('u_user_franchise_model');
							grNewEthUserModel.initialize();
							grNewEthUserModel.setValue('u_region', 'cd3ae852db486b401d3e51f74b9619dc');
							grNewEthUserModel.setValue('u_franchise', 'ca7e20d6db486b401d3e51f74b96198f');
							grNewEthUserModel.setValue('u_category', input.govPosition[l].category);
							grNewEthUserModel.setValue('u_100prod', input.govPosition[l].prod100);
							grNewEthUserModel.setValue('u_parent', modelDefaultSysId);
							
							grNewEthUserModel.insert();
						}
					}

					if (input.corpPosition.length > 0) {
						for (var l = 0; l < input.corpPosition.length; l++) {
							var grNewEthUserModel = new GlideRecord('u_user_franchise_model');
							grNewEthUserModel.initialize();
							grNewEthUserModel.setValue('u_region', 'cd3ae852db486b401d3e51f74b9619dc');
							grNewEthUserModel.setValue('u_franchise', 'ea1d2456db486b401d3e51f74b9619a7');
							grNewEthUserModel.setValue('u_category', input.corpPosition[l].category);
							grNewEthUserModel.setValue('u_100prod', input.corpPosition[l].prod100);
							grNewEthUserModel.setValue('u_parent', modelDefaultSysId);
							
							grNewEthUserModel.insert();
						}
					}

					data.working = 'Your Default User';
					gs.addInfoMessage("Saved Default User Model.");
					break;

				default:
					break;
			}
		}
		// This will be for recalculating on the fly
		else if (input.calSender) {
			//gs.addInfoMessage("in server cal");
		}
	}

})();

function CallbackToFindPositionProduction(job, subcategory) {
	for (var i = 0; i < job.length; i++) if (job[i].category == subcategory) return job[i].prod85;
}

function CallbackToFindPosition(job, subcategory) {
	for (var i = 0; i < job.length; i++) if (job[i].category == subcategory) return i;
}