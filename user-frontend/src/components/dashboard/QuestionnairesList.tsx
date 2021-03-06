import {IState as Props} from "./Questionnaire"
import React from "react";
import {useHistory} from "react-router-dom";
import "../../css/dashboard/QuestionnairesList.css"

interface IProps {
    questionnaires: Props["questionnaires"]
}

export const ListBody: React.FC<IProps> = ({questionnaires}) => {
    const history = useHistory();

    const renderList = () : JSX.Element[] => {
        return questionnaires.map(questionnaire => {

            function routeChange() {
                let title = questionnaire.title;
                history.push(`/SingleQuestionnaire/${title}`);
            }

            return (
                <span className={"cardBody"} key={questionnaire.id.toString()}
                    onClick={routeChange}>
                    {questionnaire.id}
                </span>
            )

        })
    }

    return (
        <>{renderList()}</>)
}

export const ListTitle: React.FC<IProps> = ({questionnaires}) => {

    const renderList = () : JSX.Element[] => {
        return questionnaires.map(questionnaire => {
            return (
                <span className={"cardTitle"} key={questionnaire.id.toString()}>
                    {questionnaire.title}
                </span>
            )
        })
    }

    return (
        <>{renderList()}</>)
}
