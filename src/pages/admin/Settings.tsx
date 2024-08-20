/* eslint-disable */
import React, { useState } from 'react'
import { Meta } from '../../components/Meta'
import Menu from '../../components/settings/Menu'
import { GeneralSettings } from '../../components/settings/GeneralSettings';
import { AccountSettings } from '../../components/settings/AccountSettings';

export const Settings = () => {
    const [selectedSection, setSelectedSection] = useState('General Settings');

    const renderSection = () => {
        switch (selectedSection) {
            case 'General Settings':
                return <GeneralSettings />;
            case 'Account Settings':
                return <AccountSettings />;
            default:
                return <GeneralSettings />;
        }
    };
    return (
        <>
            <Meta title='Settings - E-commerceNinjas' />
            <div className="settings">
                <h2>Settings</h2>
                <Menu selectedSection={selectedSection} onSelectSection={setSelectedSection} />
                <div className="section_container">
                    {renderSection()}
                </div>
            </div>
        </>
    )
}
