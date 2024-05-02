import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import useLoading from '../hooks/useLoading';
import useError from '../hooks/useError';
import Service from '../services/ProjectService';
import HighchartsReact from 'highcharts-react-official';
import Highcharts, { chart } from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import variwide from 'highcharts/modules/variwide';
import PieChart from 'highcharts-react-official';




export default function Pocetna() {

    HighchartsExporting(Highcharts);
    variwide(Highcharts);

    const [podaci, setPodaci] = useState([]);
    const { showLoading, hideLoading } = useLoading();
    const { prikaziError } = useError();

    async function getPodaci() {
        showLoading();
        const odgovor = await Service.get('Project');
        if (!odgovor.ok) {
            hideLoading();
            prikaziError(odgovor.podaci);
            return;
        }
        setPodaci(odgovor.podaci.map((project) => {
            return {
                
                name: project.projectName,
                y: project.totalCost,
            };
        }));
        hideLoading();
    }

    useEffect(() => {
        getPodaci();
    }, []);


    return (
        <Container className='mt-4'>
            {podaci.length > 0 && (
                
                <PieChart
                    highcharts={Highcharts}
                    options={{
                        ...fixedOptions,
                        series: [
                            {
                              name: 'Cost',
                              colorByPoint: true,
                              data: podaci
                              
                            },
                          ],
                    }}
                />
            )}
        </Container>
    );
}

const fixedOptions = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
    title: {
        text: 'Project Expenses' 
    },
    tooltip: {
        valuePrefix: '€'
    },
    plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },

};
