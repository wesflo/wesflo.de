import React from "react";

export default class extends React.Component {
    contents = [
        {
            type: 'Medien Designer Print & Non-Print',
            time: '09/2004 - 08/2006',
            school: 'LAZI AKADEMIE gGmbH The European School of Film & Design',
            city: 'Esslingen',
        },
        {
            type: 'Bauzeichner Fachrichtung Tiefbau',
            time: '09/2000 - 07/2004',
            school: 'Ingenieurbüro Kovacic',
            city: 'Sigmaringen',
        },
        {
            type: 'Mittlere Reife',
            time: '09/2004 - 08/2006',
            school: 'Realschule Gammertingen',
            city: 'Gammertingen',
        },
    ];

    render() {
        return (
            <div className={'pagePanel education'} id={'educationPanel'}>
                <div className={'col mood'}>
                    <div className="bg" style={{backgroundImage: 'url(\'img/bg/education.jpg\')'}}></div>
                </div>
                <div className={'col cnt'}>
                    <article>
                        <ol>
                            {this.contents.map((content, index) => (
                                <li key={`li-${index}`}>
                                    <em>{content.time}</em>
                                    <h4>{content.type}</h4>
                                    <span>{content.school}</span>
                                    <span>{content.city}</span>
                                </li>
                            ))}
                        </ol>
                    </article>
                </div>
            </div>
        )
    }
}
