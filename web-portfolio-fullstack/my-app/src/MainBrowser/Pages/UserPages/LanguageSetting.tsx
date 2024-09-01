import { Box, Button, Menu, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function AppBarLanguage() {

    /*
        set languge a a dropdown dashboard function
        set languge scheme. so you have three files. english, dutch and german
        set languge setting. so that when it changes its set. however.
        when it gets in here for the first time, it checks the localstorage and gets that language set first.
        default is english
    */

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [language, setLanguage] = useState<string>("English");

    useEffect(() => {
        const savedLanguage = localStorage.getItem("appLanguage") || "English";
        setLanguage(savedLanguage);
        console.log(savedLanguage)
      }, []);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem("appLanguage", lang); // Save the selected language to localStorage
        handleClose();
      };


    return(
        <>
            <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                variant="outlined"
                className='PageButtonLanguage'
                sx={{
                    color: 'black',             // Set the text color
                    '&:hover': {
                        borderColor: 'white',        // Keep outline color white on hover
                    },
                }}
                fullWidth
            >
                {language}
                {"   "}
                <ArrowDownwardIcon/>
            </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={() => handleLanguageChange("English")}>English</MenuItem>
            <MenuItem onClick={() => handleLanguageChange("Dutch")}>Dutch</MenuItem>
            <MenuItem onClick={() => handleLanguageChange("German")}>German</MenuItem>
        </Menu>
        </>
    );
}

export default AppBarLanguage;