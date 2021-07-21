import React, { createRef } from "react";
import HeadTags from "./HeadTags";
import Navbar from "./Navbar";
import {
  Container,
  Visibility,
  Grid,
  Sticky,
  Ref,
  Segment,
} from "semantic-ui-react";
import nprogress from "nprogress";
import Router, { useRouter } from "next/router";
import SideMenu from "./SideMenu";
import SearchComponent from "./Search";
import MobileHeader from "./MobileHeader";
import { createMedia } from "@artsy/fresnel";

const AppMedia = createMedia({
  breakpoints: { zero: 0, mobile: 411, tablet: 768, computer: 1025 },
});

const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;

function Layout({ children, user }) {
  const contextRef = createRef();
  const router = useRouter();

  const messagesRoute = router.pathname === "/messages";

  //loading bar on top of the web page
  //change nprogress color on nprogress css
  Router.onRouteChangeStart = () => nprogress.start();
  Router.onRouteChangeComplete = () => nprogress.done();
  Router.onRouteChangeError = () => nprogress.done();

  return (
    <>
      <HeadTags />
      {user ? (
        <>
          <style>{mediaStyles}</style>
          <MediaContextProvider>
            <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
              <Media greaterThanOrEqual="computer">
                <Ref innerRef={contextRef}>
                  <Grid>
                    {!messagesRoute ? (
                      <>
                        <Grid.Column floated="left" width={2}>
                          <Sticky context={contextRef}>
                            <SideMenu user={user} pc />
                          </Sticky>
                        </Grid.Column>

                        <Grid.Column width={10}>
                          <Visibility context={contextRef}>
                            {children}
                          </Visibility>
                        </Grid.Column>

                        <Grid.Column width={4}>
                          <Sticky context={contextRef}>
                            <Segment fluid floated="left" basic size="small">
                              <SearchComponent />
                            </Segment>
                          </Sticky>
                        </Grid.Column>
                      </>
                    ) : (
                      <>
                        <Grid.Column floated="left" width={1} />
                        <Grid.Column width={15}>{children}</Grid.Column>
                      </>
                    )}
                  </Grid>
                </Ref>
              </Media>

              <Media between={["tablet", "computer"]}>
                <Ref innerRef={contextRef}>
                  <Grid>
                    {!messagesRoute ? (
                      <>
                        <Grid.Column floated="left" width={1}>
                          <Sticky context={contextRef}>
                            <SideMenu user={user} pc={false} />
                          </Sticky>
                        </Grid.Column>

                        <Grid.Column width={15}>
                          <Visibility context={contextRef}>
                            {children}
                          </Visibility>
                        </Grid.Column>
                      </>
                    ) : (
                      <>
                        <Grid.Column floated="left" width={1} />
                        <Grid.Column width={15}>{children}</Grid.Column>
                      </>
                    )}
                  </Grid>
                </Ref>
              </Media>

              <Media between={["mobile", "tablet"]}>
                <Ref innerRef={contextRef}>
                  <Grid>
                    {!messagesRoute ? (
                      <>
                        <Grid.Column floated="left" width={2}>
                          <Sticky context={contextRef}>
                            <SideMenu user={user} pc={false} />
                          </Sticky>
                        </Grid.Column>

                        <Grid.Column width={14}>
                          <Visibility context={contextRef}>
                            {children}
                          </Visibility>
                        </Grid.Column>
                      </>
                    ) : (
                      <>
                        <Grid.Column floated="left" width={1} />
                        <Grid.Column width={15}>{children}</Grid.Column>
                      </>
                    )}
                  </Grid>
                </Ref>
              </Media>

              <Media between={["zero", "mobile"]}>
                <MobileHeader user={user} />
                <Grid>
                  <Grid.Column>{children}</Grid.Column>
                </Grid>
              </Media>
            </div>
          </MediaContextProvider>
        </>
      ) : (
        <>
          {/* <Navbar /> */}
          <Container style={{ paddingTop: "1rem" }} text>
            {children}
          </Container>
        </>
      )}
    </>
  );
}

export default Layout;
