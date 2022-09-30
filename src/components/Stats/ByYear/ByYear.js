import React from 'react';
import moment from 'moment';
import { DatePicker, Button } from 'antd';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import './ByYear.css';

import { getStats } from '../../../controllers/stats';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const getNewBarGraphData = (transactions) => {
    transactions.sort((l, r) =>
        moment(l.month, 'YYYY-MM-DD').diff(moment(r.month, 'YYYY-MM-DD'))
    );

    const labels = [];
    for (let transaction of transactions) {
        transaction.month = moment(transaction.month, 'YYYY-MM-DD').format(
            'MMM YY'
        );
        labels.push(transaction.month);
    }

    return {
        labels,
        datasets: [
            {
                label: 'Income',
                data: transactions.map((t) => Number(t.income)),
                backgroundColor: 'rgba(75, 192, 134)',
            },
            {
                label: 'Expense',
                data: transactions.map((t) => Number(t.expense)),
                backgroundColor: 'rgba(255, 99, 132)',
            },
        ],
    };
};

const getNewDonutGraphData = (income, expense) => {
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

const getIncomeAndExpense = (data) => {
    let income = 0;
    let expense = 0;
    for (let transaction of data) {
        income += Number(transaction.income);
        expense += Number(transaction.expense);
        income = Number(income.toFixed(2));
        expense = Number(expense.toFixed(2));
    }

    return { income: income.toFixed(2), expense: expense.toFixed(2) };
};

class ByYear extends React.Component {
    state = {
        income: '0',
        expense: '0',
        date: moment(),
        barGraphData: getNewBarGraphData([]),
        donutGraphData: getNewDonutGraphData(0, 0),
    };

    async componentDidMount() {
        await this.fetchData(this.state.date.format('YYYY'));
    }

    fetchData = async (date) => {
        const res = await getStats({
            type: 'year',
            date,
        });

        if (!res.error) {
            const { income, expense } = getIncomeAndExpense(res.data);
            this.setState({
                income,
                expense,
                barGraphData: getNewBarGraphData(res.data),
                donutGraphData: getNewDonutGraphData(income, expense),
                date: moment(date, 'YYYY'),
            });
        }
    };

    handleDateChange = async (e) => {
        await this.fetchData(e.format('YYYY'));
    };

    handleNext = async () => {
        const date = this.state.date.startOf('Y').add(1, 'Y').startOf('Y');
        await this.fetchData(date.format('YYYY'));
    };

    handlePrev = async () => {
        const date = this.state.date.startOf('Y').subtract(1, 'Y').startOf('Y');
        await this.fetchData(date.format('YYYY'));
    };

    render() {
        const { date, barGraphData, income, expense, donutGraphData } =
            this.state;

        return (
            <div className='Analysis-By-Year-Container'>
                <div className='Analysis-By-Year-Date-Picker'>
                    <DatePicker
                        onChange={this.handleDateChange}
                        picker='year'
                        value={date}
                        format='YYYY'
                        disabledDate={(current) => {
                            let customDate = moment().format('YYYY');
                            return (
                                current && current > moment(customDate, 'YYYY')
                            );
                        }}
                    />
                </div>
                <div className='Analysis-By-Year-Values'>
                    <p>
                        Income: {income.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </p>
                    <p>
                        Expense: {expense.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </p>
                </div>

                <div className='Analysis-By-Year-Bar-Graph'>
                    <Bar data={barGraphData} />
                </div>

                <div className='Analysis-By-Year-Donut-Graph'>
                    <Doughnut data={donutGraphData} />
                </div>

                <div className='Analysis-By-Year-Nav-Buttons'>
                    <Button type='primary' onClick={this.handlePrev}>
                        Previous
                    </Button>
                    <Button
                        type='primary'
                        onClick={this.handleNext}
                        disabled={
                            moment().startOf('Y').diff(date.startOf('Y')) <= 0
                        }
                    >
                        Next
                    </Button>
                </div>
            </div>
        );
    }
}

export default ByYear;
