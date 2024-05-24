"use client";
import * as React from "react";

import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";
import { APP_ROUTES } from "../components/Route";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

export default function AccordionControlled(props) {
  const profileProps = props.profile.courses?.modules[0].lessons[0];
  const [videoUrl, setVideoUrl] = React.useState(null);
  const [i, setI] = React.useState(0);

  const handleStartVideo = () => {
    if (videoUrl) {
      props.setCurrentVideo(APP_ROUTES.URL + "/" + videoUrl);
    } else {
      console.error("Video URL is not available");
    }
  };

  React.useEffect(() => {
    if (profileProps?.videoUrl) {
      setVideoUrl(
        profileProps.videoUrl
      );
      props.setCurrentQuestions(
        profileProps.questions
      );
      props.setCurrentLesson(
        profileProps
      );
    }
  }, [props.profile.courses]);

  React.useEffect(() => {
    handleStartVideo();
  }, [videoUrl]);

  return (
    <AccordionGroup sx={{ width: "100%" }}>
      {props.profile.courses?.modules.map((module, index) => {
        return (
          <Accordion
            key={index}
            expanded={index === i}
            onChange={(event, expanded) => {
              setI(expanded ? index : null);
            }}
            sx={{
              padding: 0,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AccordionSummary
              sx={{
                width: "100%",
                padding: "10px 20px",
                backgroundColor: "primary.dark",
              }}
            >
              {module.title}
            </AccordionSummary>
            <AccordionDetails
              sx={{ width: "100%" }}
              className="lessonsButtonWrapper"
            >
              {module.lessons.map((lesson, index) => {
                return (
                  <Box
                    key={index}
                    className="lessonButton"
                    sx={{
                      bgcolor: "neutral.light",
                      borderColor: "neutral.outlinedBorder",
                      borderBottomWidth: "1px",
                      borderTopWidth: "1px",
                      borderStyle: "solid",
                    }}
                    data-video-url={lesson.videoUrl}
                    onClick={() => {
                      props.setCurrentVideo(
                        APP_ROUTES.URL + "/" + lesson.videoUrl
                      );
                      props.setCurrentQuestions(lesson.questions);
                      props.setCurrentLesson(lesson);
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box className="df">
                        <input
                          type="checkbox"
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "0px",
                          }}
                          checked={props.profile.completedLessons.some(
                            (completedLesson) =>
                              completedLesson.lessonId === lesson.id
                          )}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          flexDirection: "column",
                          marginLeft: "20px",
                        }}
                      >
                        <h4
                          style={{
                            fontSize: "15px",
                            padding: 0,
                            marginTop: "-2px",
                            marginBottom: "4px",
                          }}
                        >
                          {lesson.title}
                        </h4>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                          }}
                        >
                          <OndemandVideoIcon
                            sx={{
                              width: "12px",
                              marginRight: "5px",
                              marginTop: "-1px",
                            }}
                          />
                          <p style={{ fontSize: "12px" }}>{lesson.time}</p>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            marginTop: "8px",
                          }}
                        >
                          <p style={{ fontSize: "13px" }}>
                            Sinov natijalari:{" "}
                            {props.profile.completedLessons.find(
                              (completedLesson) =>
                                completedLesson.lessonId === lesson.id
                            )
                              ? `${
                                  props.profile.completedLessons
                                    .find(
                                      (completedLesson) =>
                                        completedLesson.lessonId === lesson.id
                                    )
                                    .answers.filter((answer) => answer === true)
                                    .length
                                }/${lesson.questions.length}`
                              : "hali yakunlanmagan"}
                          </p>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            marginTop: "8px",
                          }}
                        >
                          <Select
                            placeholder="Dars materiallari"
                            onClick={(e) => e.stopPropagation()}
                            sx={{ fontSize: "12px" }}
                          >
                            {lesson.items.map((item, index) => (
                              <Option key={index} sx={{ fontSize: "12px" }}>
                                <a
                                  href={APP_ROUTES.URL + "/" + item}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {item}
                                </a>
                              </Option>
                            ))}
                          </Select>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </AccordionGroup>
  );
}
