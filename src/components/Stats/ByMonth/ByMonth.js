import React from 'react';
import moment from 'moment';
import { DatePicker, Button } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './ByMonth.css';

import { getStatsByMonth } from '../../../controllers/stats';

ChartJS.register(ArcElement, Tooltip, Legend);

const getNewGraphData = (income, expense) => {
    return {
        labels: ['Income', 'Expense'],
        datasets: [
            {
                data: [income, expense],
                backgroundColor: [
                    'rgba(75, 192, 134, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: ['rgba(75, 192, 134, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
            },
        ],
    };
};

class ByMonth extends React.Component {
    state = {
        income: '0',
        expense: '0',
        date: moment(),
        graphData: getNewGraphData(0, 0),
    };

    async componentDidMount() {
        await this.fetchData(this.state.date.format('YYYY-MM'));
    }

    fetchData = async (date) => {
        const res = await getStatsByMonth({
            type: 'month',
            date,
        });

        if (!res.error) {
            const income = res[date + '-01'].income;
            const expense = res[date + '-01'].expense;
            this.setState({
                income,
                expense,
            });
            this.setState({ graphData: getNewGraphData(income, expense) });
            this.setState({ date: moment(date, 'YYYY-MM') });
        }
    };

    handleDateChange = async (e) => {
        await this.fetchData(e.format('YYYY-MM'));
    };

    handleNext = async () => {
        const date = this.state.date.startOf('M').add(1, 'M').startOf('M');
        await this.fetchData(date.format('YYYY-MM'));
    };

    handlePrev = async () => {
        const date = this.state.date.startOf('M').subtract(1, 'M').startOf('M');
        await this.fetchData(date.format('YYYY-MM'));
    };

    render() {
        const { date, graphData, income, expense } = this.state;
        return (
            <div className='Analysis-By-Month-Container'>
                <div className='Analysis-By-Month-Date-Picker'>
                    <DatePicker
                        onChange={this.handleDateChange}
                        picker='month'
                        value={date}
                        format='MMMM-YYYY'
                        disabledDate={(current) => {
                            let customDate = moment().format('YYYY-MM');
                            return (
                                current &&
                                current > moment(customDate, 'YYYY-MM')
                            );
                        }}
                    />
                </div>
                <div className='Analysis-By-Month-Values'>
                    <p>
                        Income: {income.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </p>
                    <p>
                        Expense: {expense.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </p>
                </div>

                <div className='Analysis-By-Month-Graph'>
                    <Doughnut data={graphData} />
                </div>
                <div className='Analysis-By-Month-Nav-Buttons'>
                    <Button type='primary' onClick={this.handlePrev}>
                        Previous
                    </Button>
                    <Button
                        type='primary'
                        onClick={this.handleNext}
                        disabled={
                            moment().startOf('M').diff(date.startOf('M')) <= 0
                        }
                    >
                        Next
                    </Button>
                </div>
            </div>
        );
    }
}

export default ByMonth;
