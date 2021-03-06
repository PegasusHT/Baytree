import * as React from 'react';
import {backendApiURL} from "../../App";
import axios, {AxiosError, AxiosResponse} from "axios";
import LoadingDots from "../LoadingDots";

export class SubmitQuestionnaireForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: true,
            menteeId: -1,
            mentorId: -1,
            year: -1,
            month: -1,
            questionsResponse: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.getUrlParametersUpdateState();
        console.log(this.state)
    }

    getUrlParametersUpdateState() {
        const windowUrl = window.location.search;
        const params = new URLSearchParams(windowUrl);
        let dateArray = SubmitQuestionnaireForm.parseYearMonthFromDateInput(params.get('selectYearMonth'));
        let yearUrlInt: number = parseInt(dateArray[0]);
        let monthUrlInt: number = parseInt(dateArray[1]);
        this.setState({
            menteeId: parseInt(params.get('menteeId') as string),
            mentorId: parseInt(params.get('mentorId') as string),
            year: yearUrlInt,
            month: monthUrlInt
        }, this.getListOfQuestionsFromBackendUpdateState)
    }

    async getListOfQuestionsFromBackendUpdateState() {
        let url = backendApiURL + '/monthlyquestionnaire/?year=' + this.state.year + '&month=' + this.state.month;
        // let url = backendApiURL + '/monthlyquestionnaire/?year=' + this.state.year;
        console.log("Sending axios get request with URL: " + url);
        axios.get(url)
            .then((response:AxiosResponse) => {
                console.log(response);
                console.log(response.data);
                this.setState({
                    questionsResponse: response.data
                }, this.setLoadingFalseAfterAxiosGetCompletes)

            })
            .catch(function (error) {
                alert('Failed to grab questionnaire. Please try again later or contact your administrator.')
                console.log(error)
            })
    }

    private setLoadingFalseAfterAxiosGetCompletes() {
        this.setState({
            loading: false,
        })
    }

    private static parseYearMonthFromDateInput(selectYearMonth: string | null) {
        if (selectYearMonth === null) {
            return "";
        }
        return selectYearMonth.split('-');
    }

    handleSubmit(event: any) {
        event.preventDefault()
        let element = null;
        let answers = new Map<string, string>();
        Object.keys(this.state.questionsResponse).map((key) => {
            console.log("Key: " + key)
            element = document.getElementById(key)
            console.log(element)
            if (element != null) {
                console.log((element as HTMLInputElement).value);
                answers.set(key, (element as HTMLInputElement).value);
            }
        })
        console.log(answers)
        this.submitQuestionnaire(answers);
    }

    submitQuestionnaire(answers: Map<string, string>) {
        const url = backendApiURL + '/monthlyquestionnaire/submit';
        console.log("Submitting answers to " + url)
        let questionIds = Array.from(answers.keys());
        let answerValues = Array.from(answers.values());
        axios.post(url, {
            menteeId: this.state.menteeId,
            questionnaireMonth: this.state.month,
            questionnaireYear: this.state.year,
            dateSubmitted: "2021-11-19T17:14:00",
            questionIds: questionIds,
            answers: answerValues
        })
            .then((response) => {
                console.log(response)
            })
            .catch(function (error: AxiosError) {
                console.log(error);
            })
    }

    render() {
        if (this.state.loading) {
            return (
                <main>
                    <span>Loading</span>
                    <LoadingDots />
                </main>
            )
        } else if (this.state.questionsResponse != null) {
            return (
                <main>
                    <div className={"ui form sessionForm"}>
                        <form onSubmit={this.handleSubmit} id={"questionnaire-form"}>
                            {Object.keys(this.state.questionsResponse).map((key) => {
                                return (
                                    <div>
                                        <div>
                                            <label htmlFor={key}>
                                                {this.state.questionsResponse[key].Question} (Enter value 1 to 5)
                                            </label>
                                            <input
                                                type={this.state.questionsResponse[key].inputType}
                                                id={key} name={key}/>
                                        </div>
                                        <br/>
                                    </div>
                                )
                            })}
                            <span className={"submitButtonFormat"}>
                                <button className={"ui primary button"} type={"submit"} onSubmit={this.handleSubmit}>
                                    Submit
                                </button>
                                <br/>
                            </span>
                        </form>
                    </div>
                </main>
            )
        }
    }
}