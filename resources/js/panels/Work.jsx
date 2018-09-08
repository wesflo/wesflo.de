import React from "react";

export default class extends React.Component {
    latestJobs = [
        {
            time: 'seit 09/2017',
            company: 'Surf Media GmbH',
            city: 'Hamburg',
            title: 'Senior Frontend Developer',
            toDos: [
                'React',
                'Redux',
                'ES6',
                'JavaScript',
                'SCSS',
                'gulp',
                'webpack',
                'Laravel',
                'Whitelabels',
                'PHP',
            ]
        },
        {
            time: '06/2017 - 08/2017',
            company: 'Arvato eCommerce Verw.-Ges. mbH',
            city: 'Hamburg',
            title: 'Senior Frontend Developer',
            toDos: [
                'SCSS',
                'JavaScript',
                'Bootstrap',
                'Spryker',
                'Pimcore',
            ]
        },
        {
            time: '09/2014 - 05/20017',
            company: 'MindGeek',
            city: 'Hamburg',
            title: 'Senior Frontend Developer',
            toDos: [
                'JavaScript',
                'SCSS',
                'Grunt',
                'Zend',
                'SEO',
                'Performance',
            ]
        },
        {
            time: '08/2012 - 08/2014',
            company: 'TWT Interactive',
            city: 'Düsseldorf',
            title: 'Web Developer',
            toDos: [
                'Typo3',
                'PHP',
                'JavaScript',
                'jQuery',
                'Magento',
                'HybridApps',
                'LESS',
            ]
        },
    ];

    olderJobs = [
        {
            time: '03/2012 - 12/2015',
            company: 'wesflo - Freelancer',
            title: 'Web Developer',
        },
        {
            time: '08/2010 - 02/2012',
            company: 'Simple Web-Solutions GmbH',
            city: 'Rosbach v.d.H.',
            title: 'Senior Web Developer',
        },
        {
            time: '03/2010 - 08/2010',
            company: 'RSK Group AG',
            city: 'Düsseldorf',
            title: 'Junior Flash Developer',
        },
        {
            time: '02/2008 - 03/2010',
            company: 'Simple Web-Solutions GmbH',
            city: 'Rosbach v.d.H.',
            title: 'Web Developer',
        },
        {
            time: '03/2007 - 01/2008',
            company: 'Schönhals & Heckmann oHG',
            city: 'Nidda',
            title: ' Junior Web Developer',
        },
        {
            time: '09/2006 - 02/2007',
            company: 'VHS Pforzheim Enzkreis GmbH',
            city: 'Pforzheim',
            title: 'Praktika Medien Design',
        },
    ];

    render() {
        return (
            <div className={'pagePanel work'} id={'workPanel'}>
                <div className={'col mood'}>
                    <div className="bg" style={{backgroundImage: 'url(\'img/bg/work.jpg\')'}}></div>
                </div>
                <div className={'col cnt'}>
                    <article>
                        <h2 className="h1">Lastest Jobs</h2>
                        <ol>
                            {this.latestJobs.map((job, index) => (
                                <li key={`li-${index}`}>
                                    <em>{job.time}</em>
                                    <h4>{job.title}</h4>
                                    <span>{job.company}, {job.city}</span>
                                    <ul>
                                        {job.toDos.map((toDo, i) => (
                                            <li key={`li-${i}`}>
                                                {toDo}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ol>
                    </article>
                    <article>
                        <h3>Older Jobs</h3>
                        <ol className={'olderJobs'}>
                            {this.olderJobs.map((job, index) => (
                                <li key={`li-${index}`}>
                                    <em>{job.time}</em>
                                    <h5>{job.title}</h5>
                                    <span>{job.company}, {job.city}</span>
                                </li>
                            ))}
                        </ol>
                    </article>
                </div>
            </div>
        )
    }
}
