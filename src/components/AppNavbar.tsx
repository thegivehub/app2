import {
    ActionIcon,
    Avatar,
    Box,
    BoxProps,
    Burger,
    Container,
    createStyles,
    Drawer,
    Group,
    Header,
    Menu,
    rem,
    ScrollArea,
    Text,
    UnstyledButton,
} from '@mantine/core';
import {useDisclosure, useMediaQuery} from '@mantine/hooks';
import {
    IconBell,
    IconChevronDown,
    IconHeart,
    IconLogout,
    IconMessage,
    IconSearch,
    IconSettings,
    IconStar,
} from '@tabler/icons-react';
import {useState} from "react";
import {AppLinks, BrandName, SearchDrawer} from "./index";

const useStyles = createStyles((theme) => ({
    header: {
        backgroundColor: theme.colors.primary[6]
    },

    user: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[0],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.primary[7],
            color: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },

        [theme.fn.smallerThan('sm')]: {
            // display: 'none',
            padding: 4
        },
    },

    userActive: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan('sm')]: {
            height: rem(42),
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.primary[0],
        }),
    },

    subLink: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.primary[0],
        }),

        '&:active': theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: `calc(${theme.spacing.md} * -1)`,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
        paddingBottom: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
        }`,
    },

    title: {
        textAlign: 'center',
        fontWeight: 800,
        fontSize: rem(40),
        letterSpacing: -1,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        marginBottom: theme.spacing.xs,

        [theme.fn.smallerThan('xs')]: {
            fontSize: rem(28),
            textAlign: 'left',
        },
    },

    highlight: {
        color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
    },

    hiddenMobile: {
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan('md')]: {
            display: 'none',
        },
    },

    drawerHeader: {
        backgroundColor: theme.colors.primary[6],
        color: theme.white
    },

    close: {
        color: theme.white
    }
}));

const user = {
    "name": "Christopher Robison",
    "email": "cdr@cdr2.com",
    "image": "data:image/jpeg;base64,/9j/4gxYSUNDX1BST0ZJTEUAAQEAAAxITGlubwIQAABtbnRyUkdCIFhZWiAHzgACAAkABgAxAABhY3NwTVNGVAAAAABJRUMgc1JHQgAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLUhQICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFjcHJ0AAABUAAAADNkZXNjAAABhAAAAGx3dHB0AAAB8AAAABRia3B0AAACBAAAABRyWFlaAAACGAAAABRnWFlaAAACLAAAABRiWFlaAAACQAAAABRkbW5kAAACVAAAAHBkbWRkAAACxAAAAIh2dWVkAAADTAAAAIZ2aWV3AAAD1AAAACRsdW1pAAAD+AAAABRtZWFzAAAEDAAAACR0ZWNoAAAEMAAAAAxyVFJDAAAEPAAACAxnVFJDAAAEPAAACAxiVFJDAAAEPAAACAx0ZXh0AAAAAENvcHlyaWdodCAoYykgMTk5OCBIZXdsZXR0LVBhY2thcmQgQ29tcGFueQAAZGVzYwAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAPNRAAEAAAABFsxYWVogAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z2Rlc2MAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkZXNjAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAsUmVmZXJlbmNlIFZpZXdpbmcgQ29uZGl0aW9uIGluIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHZpZXcAAAAAABOk/gAUXy4AEM8UAAPtzAAEEwsAA1yeAAAAAVhZWiAAAAAAAEwJVgBQAAAAVx/nbWVhcwAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAo8AAAACc2lnIAAAAABDUlQgY3VydgAAAAAAAAQAAAAABQAKAA8AFAAZAB4AIwAoAC0AMgA3ADsAQABFAEoATwBUAFkAXgBjAGgAbQByAHcAfACBAIYAiwCQAJUAmgCfAKQAqQCuALIAtwC8AMEAxgDLANAA1QDbAOAA5QDrAPAA9gD7AQEBBwENARMBGQEfASUBKwEyATgBPgFFAUwBUgFZAWABZwFuAXUBfAGDAYsBkgGaAaEBqQGxAbkBwQHJAdEB2QHhAekB8gH6AgMCDAIUAh0CJgIvAjgCQQJLAlQCXQJnAnECegKEAo4CmAKiAqwCtgLBAssC1QLgAusC9QMAAwsDFgMhAy0DOANDA08DWgNmA3IDfgOKA5YDogOuA7oDxwPTA+AD7AP5BAYEEwQgBC0EOwRIBFUEYwRxBH4EjASaBKgEtgTEBNME4QTwBP4FDQUcBSsFOgVJBVgFZwV3BYYFlgWmBbUFxQXVBeUF9gYGBhYGJwY3BkgGWQZqBnsGjAadBq8GwAbRBuMG9QcHBxkHKwc9B08HYQd0B4YHmQesB78H0gflB/gICwgfCDIIRghaCG4IggiWCKoIvgjSCOcI+wkQCSUJOglPCWQJeQmPCaQJugnPCeUJ+woRCicKPQpUCmoKgQqYCq4KxQrcCvMLCwsiCzkLUQtpC4ALmAuwC8gL4Qv5DBIMKgxDDFwMdQyODKcMwAzZDPMNDQ0mDUANWg10DY4NqQ3DDd4N+A4TDi4OSQ5kDn8Omw62DtIO7g8JDyUPQQ9eD3oPlg+zD88P7BAJECYQQxBhEH4QmxC5ENcQ9RETETERTxFtEYwRqhHJEegSBxImEkUSZBKEEqMSwxLjEwMTIxNDE2MTgxOkE8UT5RQGFCcUSRRqFIsUrRTOFPAVEhU0FVYVeBWbFb0V4BYDFiYWSRZsFo8WshbWFvoXHRdBF2UXiReuF9IX9xgbGEAYZRiKGK8Y1Rj6GSAZRRlrGZEZtxndGgQaKhpRGncanhrFGuwbFBs7G2MbihuyG9ocAhwqHFIcexyjHMwc9R0eHUcdcB2ZHcMd7B4WHkAeah6UHr4e6R8THz4faR+UH78f6iAVIEEgbCCYIMQg8CEcIUghdSGhIc4h+yInIlUigiKvIt0jCiM4I2YjlCPCI/AkHyRNJHwkqyTaJQklOCVoJZclxyX3JicmVyaHJrcm6CcYJ0kneierJ9woDSg/KHEooijUKQYpOClrKZ0p0CoCKjUqaCqbKs8rAis2K2krnSvRLAUsOSxuLKIs1y0MLUEtdi2rLeEuFi5MLoIuty7uLyQvWi+RL8cv/jA1MGwwpDDbMRIxSjGCMbox8jIqMmMymzLUMw0zRjN/M7gz8TQrNGU0njTYNRM1TTWHNcI1/TY3NnI2rjbpNyQ3YDecN9c4FDhQOIw4yDkFOUI5fzm8Ofk6Njp0OrI67zstO2s7qjvoPCc8ZTykPOM9Ij1hPaE94D4gPmA+oD7gPyE/YT+iP+JAI0BkQKZA50EpQWpBrEHuQjBCckK1QvdDOkN9Q8BEA0RHRIpEzkUSRVVFmkXeRiJGZ0arRvBHNUd7R8BIBUhLSJFI10kdSWNJqUnwSjdKfUrESwxLU0uaS+JMKkxyTLpNAk1KTZNN3E4lTm5Ot08AT0lPk0/dUCdQcVC7UQZRUFGbUeZSMVJ8UsdTE1NfU6pT9lRCVI9U21UoVXVVwlYPVlxWqVb3V0RXklfgWC9YfVjLWRpZaVm4WgdaVlqmWvVbRVuVW+VcNVyGXNZdJ114XcleGl5sXr1fD19hX7NgBWBXYKpg/GFPYaJh9WJJYpxi8GNDY5dj62RAZJRk6WU9ZZJl52Y9ZpJm6Gc9Z5Nn6Wg/aJZo7GlDaZpp8WpIap9q92tPa6dr/2xXbK9tCG1gbbluEm5rbsRvHm94b9FwK3CGcOBxOnGVcfByS3KmcwFzXXO4dBR0cHTMdSh1hXXhdj52m3b4d1Z3s3gReG54zHkqeYl553pGeqV7BHtje8J8IXyBfOF9QX2hfgF+Yn7CfyN/hH/lgEeAqIEKgWuBzYIwgpKC9INXg7qEHYSAhOOFR4Wrhg6GcobXhzuHn4gEiGmIzokziZmJ/opkisqLMIuWi/yMY4zKjTGNmI3/jmaOzo82j56QBpBukNaRP5GokhGSepLjk02TtpQglIqU9JVflcmWNJaflwqXdZfgmEyYuJkkmZCZ/JpomtWbQpuvnByciZz3nWSd0p5Anq6fHZ+Ln/qgaaDYoUehtqImopajBqN2o+akVqTHpTilqaYapoum/adup+CoUqjEqTepqaocqo+rAqt1q+msXKzQrUStuK4trqGvFq+LsACwdbDqsWCx1rJLssKzOLOutCW0nLUTtYq2AbZ5tvC3aLfguFm40blKucK6O7q1uy67p7whvJu9Fb2Pvgq+hL7/v3q/9cBwwOzBZ8Hjwl/C28NYw9TEUcTOxUvFyMZGxsPHQce/yD3IvMk6ybnKOMq3yzbLtsw1zLXNNc21zjbOts83z7jQOdC60TzRvtI/0sHTRNPG1EnUy9VO1dHWVdbY11zX4Nhk2OjZbNnx2nba+9uA3AXcit0Q3ZbeHN6i3ynfr+A24L3hROHM4lPi2+Nj4+vkc+T85YTmDeaW5x/nqegy6LzpRunQ6lvq5etw6/vshu0R7ZzuKO6070DvzPBY8OXxcvH/8ozzGfOn9DT0wvVQ9d72bfb794r4Gfio+Tj5x/pX+uf7d/wH/Jj9Kf26/kv+3P9t////4Q1BaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA2LjAtYzAwMyA3OS4xNjQ1MjcsIDIwMjAvMTAvMTUtMTc6NDg6MzIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMy0wNy0wN1QxMzo0MzozMi0wNzowMCIgeG1wOkNyZWF0b3JUb29sPSI5LjIiIHhtcDpDcmVhdGVEYXRlPSIyMDE2LTAxLTI0VDEyOjU5OjU2IiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTA3LTA3VDEzOjQzOjMyLTA3OjAwIiBkYzpmb3JtYXQ9ImltYWdlL2pwZWciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgcGhvdG9zaG9wOkRhdGVDcmVhdGVkPSIyMDE2LTAxLTI0VDEyOjU5OjU2LjM5MyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozYjY4ZThkZC0wOWI2LTQ4ZjEtYTUzNi0xZDUxZTU2MDRhOTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M2I2OGU4ZGQtMDliNi00OGYxLWE1MzYtMWQ1MWU1NjA0YTk3IiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6M2I2OGU4ZGQtMDliNi00OGYxLWE1MzYtMWQ1MWU1NjA0YTk3Ij4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6M2I2OGU4ZGQtMDliNi00OGYxLWE1MzYtMWQ1MWU1NjA0YTk3IiBzdEV2dDp3aGVuPSIyMDIzLTA3LTA3VDEzOjQzOjMyLTA3OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuMSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/hF5xFeGlmAABNTQAqAAAACAALAQ8AAgAAAAYAAACSARAAAgAAAA4AAACYARIAAwAAAAEAAQAAARoABQAAAAEAAACmARsABQAAAAEAAACuASgAAwAAAAEAAgAAATEAAgAAACEAAAC2ATIAAgAAABQAAADXAhMAAwAAAAEAAQAAh2kABAAAAAEAAADsiCUABAAAAAEAAAMIAAAEQEFwcGxlAGlQaG9uZSA2IFBsdXMAAA6mAAAAJxAADqYAAAAnEEFkb2JlIFBob3Rvc2hvcCAyMi4xIChNYWNpbnRvc2gpADIwMjM6MDc6MDcgMTM6NDM6MzIAAAAegpoABQAAAAEAAAJagp0ABQAAAAEAAAJiiCIAAwAAAAEAAgAAiCcAAwAAAAEAQAAAkAAABwAAAAQwMjIxkAMAAgAAABQAAAJqkAQAAgAAABQAAAJ+kQEABwAAAAQBAgMAkgEACgAAAAEAAAKSkgIABQAAAAEAAAKakgMACgAAAAEAAAKikgQACgAAAAEAAAKqkgcAAwAAAAEABQAAkgkAAwAAAAEAIAAAkgoABQAAAAEAAAKykpEAAgAAAAQzOTMAkpIAAgAAAAQzOTMAoAAABwAAAAQwMTAwoAEAAwAAAAEAAQAAoAIABAAAAAEAAAHyoAMABAAAAAEAAAIAohcAAwAAAAEAAgAAowEABwAAAAEBAAAApAIAAwAAAAEAAAAApAMAAwAAAAEAAAAApAUAAwAAAAEAHwAApAYAAwAAAAEAAAAApDIABQAAAAQAAAK6pDMAAgAAAAYAAALapDQAAgAAACgAAALgAAAAAAAAAAEAAAAeAAAACwAAAAUyMDE2OjAxOjI0IDEy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"
}

const ICON_SIZE = 18

type IProps = BoxProps

const AppNavbar = ({...others}: IProps) => {
    const {classes, theme, cx} = useStyles();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const [drawerOpened, {toggle: toggleDrawer, close: closeDrawer}] = useDisclosure(false);
    const [searchOpened, {toggle: toggleSearchDrawer, close: closeSearchDrawer}] = useDisclosure(false);
    const matchesMobile = useMediaQuery('(max-width: 600px)');

    return (
        <Box {...others}>
            <Header
                height={{base: 50, md: 70}}
                className={classes.header}
            >
                <Container
                    fluid
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        fontSize: '14px',
                    }}
                >
                    <Burger
                        opened={drawerOpened}
                        onClick={toggleDrawer}
                        className={classes.hiddenDesktop}
                        color="white"
                    />

                    <Group position="apart" sx={{width: '100%'}}>
                        <Group>
                            <BrandName
                                size={24}
                                ml={matchesMobile ? 'md' : 'xs'}
                                asLink
                                variant="grayscale"
                            />
                            <AppLinks className={classes.hiddenMobile}/>
                        </Group>
                        <Group>
                            <ActionIcon variant="filled" color={theme.white} onClick={toggleSearchDrawer}>
                                <IconSearch size={ICON_SIZE}/>
                            </ActionIcon>
                            <ActionIcon variant="filled" color={theme.white}>
                                <IconBell size={ICON_SIZE}/>
                            </ActionIcon>
                            <Menu
                                width={260}
                                position="bottom-end"
                                transitionProps={{transition: 'pop-top-right'}}
                                onClose={() => setUserMenuOpened(false)}
                                onOpen={() => setUserMenuOpened(true)}
                                withinPortal
                            >
                                <Menu.Target>
                                    <UnstyledButton
                                        className={cx(classes.user, {[classes.userActive]: userMenuOpened})}
                                    >
                                        <Group spacing={7}>
                                            <Avatar
                                                src={user.image}
                                                alt={user.name}
                                                radius="xl"
                                                size={matchesMobile ? 18 : 20}
                                            />
                                            {!matchesMobile &&
                                                <>
                                                    <Text weight={500} size="sm" sx={{lineHeight: 1}} mr={3}>
                                                        {user.name}
                                                    </Text>
                                                    <IconChevronDown size={rem(12)} stroke={1.5}/>
                                                </>}
                                        </Group>
                                    </UnstyledButton>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item
                                        icon={<IconHeart
                                            size="0.9rem"
                                            color={theme.colors.red[6]}
                                            stroke={1.5}
                                        />}
                                    >
                                        Liked posts
                                    </Menu.Item>
                                    <Menu.Item
                                        icon={<IconStar
                                            size="0.9rem"
                                            color={theme.colors.yellow[6]}
                                            stroke={1.5}/>}
                                    >
                                        Saved posts
                                    </Menu.Item>
                                    <Menu.Item
                                        icon={<IconMessage
                                            size="0.9rem"
                                            color={theme.colors.blue[6]}
                                            stroke={1.5}/>}
                                    >
                                        Your comments
                                    </Menu.Item>

                                    <Menu.Label>Settings</Menu.Label>
                                    <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5}/>}>
                                        Account settings
                                    </Menu.Item>
                                    <Menu.Item
                                        icon={<IconLogout size="0.9rem" stroke={1.5}/>}>Logout</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>
                    </Group>
                </Container>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                className={classes.hiddenDesktop}
                classNames={{header: classes.drawerHeader, close: classes.close}}
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(0)})`} mx="-md" sx={{backgroundColor: theme.colors.primary[6]}}>
                    <AppLinks direction='column'/>
                </ScrollArea>
            </Drawer>

            <SearchDrawer opened={searchOpened} onClose={closeSearchDrawer}/>
        </Box>
    );
}

export default AppNavbar;
