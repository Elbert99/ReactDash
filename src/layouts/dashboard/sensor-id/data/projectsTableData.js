/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
// @mui material components
// import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
// import LogoAsana from "assets/images/small-logos/logo-asana.svg";
// import logoGithub from "assets/images/small-logos/github.svg";
// import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
// import logoSlack from "assets/images/small-logos/logo-slack.svg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
// import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "sensor id", accessor: "project", width: "30%", align: "left" },
      { Header: "value", accessor: "budget", align: "center" },
      { Header: "timestamp", accessor: "status", align: "right" },
    ],

    rows: [
      {
        project: <Project name="First1" />,
        budget: 5.67,
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/3/2023 16:03
          </MDTypography>
        ),
      },
      {
        // project: <Project image={logoGithub} name="Github" />,
        project: <Project name="First1" />,
        budget: (
          <MDTypography component="a" color="text" fontWeight="medium">
            5.8
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/3/2023 16:03
          </MDTypography>
        ),
      },
      {
        project: <Project name="First1" />,
        budget: (
          <MDTypography component="a" color="text" fontWeight="medium">
            5.89
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            23/3/2023 16:03
          </MDTypography>
        ),
      },
    ],
  };
}
