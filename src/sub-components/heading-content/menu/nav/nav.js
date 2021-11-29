import React from "react";

import Link from "../../../../../components/link";

import StyledNav from "./styled-nav";
import MenuItem from "../menu-item";
import Box from "./box";

const Nav = ({
    onClick,
    t,
    stateMobile,
    ...rest
}) => {
    return (
        <StyledNav {...rest} stateMobile={stateMobile}>
            <button onClick={onClick} >x</button>
            <MenuItem heading="Products & Features">
                <Box>
                    <Link href="/office-suite.aspx">ONLYOFFICE Docs</Link>
                    <Box>
                        <Link href="/document-editor.aspx">Document Editor</Link>
                        <Link href="/spreadsheet-editor.aspx">Spreadsheet Editor</Link>
                        <Link href="/presentation-editor.aspx">Presentation Editor</Link>
                    </Box>
                    <Link>Docs Editions</Link>
                    <Box>
                        <Link href="/docs-cloud.aspx">Cloud Edition</Link>
                        <Link href="/docs-enterprise.aspx">Enterprise Edition</Link>
                        <Link href="/developer-edition.aspx">Developer Edition</Link>
                    </Box>
                    <Link href="/desktop.aspx">ONLYOFFICE for desktop</Link>
                    <Link href="/office-for-ios.aspx">ONLYOFFICE for iOS</Link>
                    <Link href="/office-for-android.aspx">ONLYOFFICE for Android</Link>
                </Box>
                <Box>
                    <Link href="/workspace.aspx">ONLYOFFICE Workspace</Link>
                    <Box>
                        <Link href="/document-management.aspx">Documents</Link>
                        <Link href="/mail.aspx">Mail</Link>
                        <Link href="/crm.aspx">CRM</Link>
                        <Link href="/projects.aspx">Projects</Link>
                        <Link href="/calendar.aspx">Calendar</Link>
                    </Box>
                    <Link>Workspace Editions</Link>
                    <Box>
                        <Link href="/cloud-office.aspx">Cloud Edition</Link>
                        <Link href="/workspace-enterprise.aspx">Enterprise Edition</Link>
                    </Box>
                </Box>
                <Box>
                    <Link href="/security.aspx">Security</Link>
                    <Box>
                        <div id="security_img" className="menu_pic_img"></div>
                        <p id="security_header" className="menu_pic_header">Meet ONLYOFFICE Private Rooms where every symbol you type is encrypted <span className="nowrap">end-to-end</span></p>
                    </Box>
                </Box>
            </MenuItem>

            <MenuItem heading="Integrations">
                <Box>
                    <Box className="li_without_border">
                        <Link href="/office-for-nextcloud.aspx">Nextcloud</Link>
                        <Link href="/office-for-owncloud.aspx">ownCloud</Link>
                        <Link href="/office-for-confluence.aspx">Confluence</Link>
                        <Link href="/office-for-alfresco.aspx">Alfresco</Link>
                        <Link href="/office-for-sharepoint.aspx">SharePoint</Link>
                        <Link href="/office-for-liferay.aspx">Liferay</Link>
                    </Box>
                    <Box>
                        <Link href="/office-for-humhub.aspx">HumHub</Link>
                        <Link href="/office-for-plone.aspx">Plone</Link>
                        <Link href="/office-for-nuxeo.aspx">Nuxeo</Link>
                        <Link href="/office-for-chamilo.aspx">Chamilo</Link>
                        <Link href="/office-for-redmine.aspx">Redmine</Link>
                        <Link href="/all-connectors.aspx">Others</Link>
                    </Box>
                    <Box>
                        <Link href="/developer-edition.aspx">For developers</Link>
                        <Box>
                            <div id="for_developers_img" className="menu_pic_img"></div>
                            <p id="for_developers_header" className="menu_pic_header">Integrate ONLYOFFICE Docs to bring document editing to your app users</p>
                        </Box>
                    </Box>
                </Box>
            </MenuItem>

            <MenuItem heading="Pricing">
                <Box>
                    <Box>
                        <Link>ONLYOFFICE Docs</Link>
                        <Box>
                            <Link href="/docs-enterprise-prices.aspx">Enterprise Edition</Link>
                            <Link href="/developer-edition-prices.aspx">Developer Edition</Link>
                        </Box>
                        <Link>ONLYOFFICE Workspace</Link>
                        <Box>
                            <Link href="/saas.aspx">Cloud Service</Link>
                            <Link href="/workspace-enterprise-prices.aspx">Server Enterprise</Link>
                        </Box>
                    </Box>
                </Box>
            </MenuItem>

            <MenuItem heading="Get ONLYOFFICE">
                <Box id="navitem_download_menu">
                    <Box className="pushy-link">
                        <Link className="dropdown-item mobile_no_link" id="navitem_download_docs">ONLYOFFICE Docs</Link>
                        <Box>
                            <Link className="nav_item_nowrap_link" id="navitem_download_signup_docs" href="/docs-registration.aspx">Sign up for cloud</Link>
                            <Link id="navitem_download_onpremises_docs" href="/download-docs.aspx?from=downloadintegrationmenu">Install on-premises</Link>
                        </Box>
                        <Link className="dropdown-item mobile_no_link" id="navitem_download_workspace">ONLYOFFICE Workspace</Link>
                        <Box>
                            <Link className="nav_item_nowrap_link" id="navitem_download_signin" href="/signin.aspx">Sign in</Link>

                            <Link className="nav_item_nowrap_link second" id="navitem_download_signup" href="/registration.aspx">Sign up for cloud</Link>
                            <Link id="navitem_download_onpremises" href="/download-workspace.aspx">Install on-premises</Link>
                        </Box>
                        <Link className="dropdown-item" id="navitem_download_desktop" href="download-desktop.aspx">ONLYOFFICE desktop and mobile apps</Link>
                        <Link className="dropdown-item" id="navitem_download_products" href="download.aspx">Other products</Link>
                    </Box>
                    <Box id="navitem_compare_third_level_menu">
                        <Link id="navitem_download_compare" className="dropdown-item" href="/compare-editions.aspx">Compare editions</Link>
                        <Box id="compare_div" className="menu_pic_div">
                            <div id="compare_img" className="menu_pic_img"></div>
                            <p id="compare_header" className="menu_pic_header">Choose the ONLYOFFICE edition that suits you best.</p>
                        </Box>
                    </Box>
                </Box>
            </MenuItem>

            <MenuItem heading="Partners">
                <Box>
                    <Box>
                        <Link href="affiliates.aspx">Affiliates</Link>
                        <Link href="resellers.aspx">Resellers</Link>
                        <Link href="find-partners.aspx">Find partners</Link>
                        <Link href="partnership-request.aspx">Submit request</Link>
                    </Box>
                    <Box>
                        <Link href="https://www.onlyoffice.com/blog/2021/03/onlyoffice-joins-the-linux-foundation-as-a-silver-member/">Latest events</Link>
                        <Box id="latest_events_div" className="menu_pic_div">
                            <div id="latest_events_img" className="menu_pic_img"></div>
                            <p id="latest_events_header" className="menu_pic_header">ONLYOFFICE joins the Linux Foundation as a silver member</p>
                        </Box>
                    </Box>
                </Box>
            </MenuItem>

            <MenuItem heading="About">
                <Box>
                    <Box>
                        <Link href="about.aspx">About ONLYOFFICE</Link>
                        <Link href="https://www.onlyoffice.com/blog/">Blog</Link>
                        <Link href="contribute.aspx">Contribute</Link>
                        <Link href="customers.aspx">Customers</Link>
                        <Link href="awards.aspx">Awards</Link>
                        <Link href="events.aspx">Events</Link>
                        <Link href="press-downloads.aspx">Press downloads</Link>
                        <Link href="whitepapers.aspx">White papers</Link>
                        <Link href="training-courses.aspx">Training courses</Link>
                        <Link href="https://shop.spreadshirt.com/onlyoffice">Gift shop</Link>
                        <Link href="contacts.aspx">Contacts</Link>
                    </Box>
                    <Link href="https://www.onlyoffice.com/blog/">Latest news</Link>
                </Box>
            </MenuItem>
        </StyledNav>
    );
};

export default Nav;