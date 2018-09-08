import React from "react";

export default class extends React.Component {
    contents = [
        {
            title: 'Proggs',
            list: [
                'phpStorm',
                'Atom',
                'Terminal',
                'Photoshop',
                'Illustrator',
                'SourceTree',
                'Sequel Pro',
            ],
        },
        {
            title: 'Tools',
            list: [
                'Gulp',
                'Webpack',
                'Grunt',
                'git (GitHub, GitLab)',
                'Jira',
                'Audits',
            ],
        },
        {
            title: 'Frameworks',
            list: [
                'React',
                'Redux',
                'Bootstrap',
            ],
        },
        {
            title: 'Languages',
            list: [
                'JavaScript (ES6)',
                'SCSS/LESS (CSS3)',
                'php',
                'Twig',
                'HTML5',
                'Deutsch',
                'Englisch',
            ],
        },
    ];

    render() {
        return (
            <div className={'pagePanel skills'} id={'skillsPanel'}>
                <div className={'col mood'}>
                    <div className="bg" style={{backgroundImage: 'url(\'img/bg/skills.jpg\')'}}></div>
                </div>
                <div className={'col cnt'}>
                    {this.contents.map(content => (
                        <article key={content.title}>
                            <h3 className="h1">
                                {content.title}
                            </h3>
                            <ul>
                                {content.list.map(item => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        )
    }
}
