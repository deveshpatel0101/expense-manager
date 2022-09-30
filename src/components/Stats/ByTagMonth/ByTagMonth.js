import React from 'react';
import moment from 'moment';
import { DatePicker, Button } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './ByTagMonth.css';

import { getStats } from '../../../controllers/stats';
import { getTags } from '../../../controllers/tags';

ChartJS.register(ArcElement, Tooltip, Legend);

const BG_COLORS = [
    'rgba(47, 79, 79, 0.2)',
    'rgba(127, 0, 0, 0.2)',
    'rgba(0, 128, 0, 0.2)',
    'rgba(189, 183, 107, 0.2)',
    'rgba(0, 0, 139, 0.2)',
    'rgba(255, 0, 0, 0.2)',
    'rgba(255, 165, 0, 0.2)',
    'rgba(255, 255, 0, 0.2)',
    'rgba(199, 21, 133, 0.2)',
    'rgba(0, 255, 0, 0.2)',
    'rgba(0, 0, 255, 0.2)',
    'rgba(216, 191, 216, 0.2)',
    'rgba(255, 0, 255, 0.2)',
    'rgba(30, 144, 255, 0.2)',
    'rgba(127, 255, 212, 0.2)',
];

const BORDER_COLORS = [
    'rgba(47, 79, 79, 1)',
    'rgba(127, 0, 0, 1)',
    'rgba(0, 128, 0, 1)',
    'rgba(189, 183, 107, 1)',
    'rgba(0, 0, 139, 1)',
    'rgba(255, 0, 0, 1)',
    'rgba(255, 165, 0, 1)',
    'rgba(255, 255, 0, 1)',
    'rgba(199, 21, 133, 1)',
    'rgba(0, 255, 0, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(133, 81, 133, 1)',
    'rgba(255, 0, 255, 1)',
    'rgba(30, 144, 255, 1)',
    'rgba(127, 255, 212, 1)',
];

const getNewGraphData = (tags, amounts) => {
    return {
        labels: [...tags],
        datasets: [
            {
                data: [...amounts],
                backgroundColor: [...BG_COLORS],
                borderColor: [...BORDER_COLORS],
                borderWidth: 1,
            },
        ],
    };
};

class ByTagMonth extends React.Component {
    state = {
        tags: [],
        data: [],
        amounts: [],
        date: moment(),
        graphData: getNewGraphData([], []),
    };

    async componentDidMount() {
        await this.fetchTags();
        await this.fetchStats(this.state.date.format('YYYY-MM'));
    }

    fetchTags = async () => {
        const res = await getTags(1, 100);
        if (res.error) {
            alert(res.errorMessage);
            return;
        }

        const tags = [];
        for (const tag of res.tags) {
            tags.push(tag.name);
        }
        tags.sort();
        this.setState({ tags });
    };

    fetchStats = async (date) => {
        const res = await getStats({
            type: 'tag-month',
            date,
        });

        const { tags } = this.state;
        if (res.error) {
            alert(res.errorMessage);
            return;
        }

        const data = [...res.data];
        for (let i = 0; i < data.length; i++) {
            data[i].amount = Number(data[i].amount);
        }

        data.sort((a, b) =>
            a.amount < b.amount ? 1 : a.amount === b.amount ? 0 : -1
        );

        const amounts = this.getAmounts(tags, data);
        this.setState({
            data,
            amounts,
            graphData: getNewGraphData(tags, amounts),
            date: moment(date, 'YYYY-MM'),
        });
    };

    getAmounts = (tags, data) => {
        const amountsByName = {};
        for (const item of data) {
            amountsByName[item.name] = Number(item.amount);
        }

        const amounts = [];
        for (const tag of tags) {
            amounts.push(amountsByName[tag]);
        }

        return amounts;
    };

    handleDateChange = async (e) => {
        await this.fetchStats(e.format('YYYY-MM'));
    };

    handleNext = async () => {
        const date = this.state.date.startOf('M').add(1, 'M').startOf('M');
        await this.fetchStats(date.format('YYYY-MM'));
    };

    handlePrev = async () => {
        const date = this.state.date.startOf('M').subtract(1, 'M').startOf('M');
        await this.fetchStats(date.format('YYYY-MM'));
    };

    render() {
        const { date, graphData, data } = this.state;
        return (
            <div className='Analysis-By-Tag-Month-Container'>
                <div className='Analysis-By-Tag-Month-Date-Picker'>
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

                <div className='Analysis-By-Tag-Month-Graph'>
                    <Doughnut data={graphData} />
                </div>

                <div className='Analysis-By-Tag-Month-Data'>
                    {data.map((item, i) => (
                        <div
                            className='Analysis-By-Tag-Month-Data-Item'
                            key={i}
                        >
                            <span>{item.name}</span>
                            <span>${Number(item.amount).toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                <div className='Analysis-By-Tag-Month-Nav-Buttons'>
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

export default ByTagMonth;
