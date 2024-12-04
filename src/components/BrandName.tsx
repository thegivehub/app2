import {createStyles, rem, Text, Title, TitleProps, UnstyledButton} from "@mantine/core";
import {Link} from "react-router-dom";

const useStyles = createStyles((theme) => ({
    title: {
        textAlign: 'center',
        fontWeight: 900,
        letterSpacing: -1,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [theme.fn.smallerThan('md')]: {
            fontWeight: 700,
        },

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(24),
            textAlign: 'left',
        },
    },

    highlight: {
        color: '#99bbff'
    },

    white: {
        textAlign: 'center',
        fontWeight: 800,
        letterSpacing: -1,
        color: theme.colors.gray[0],

        [theme.fn.smallerThan('md')]: {
            fontWeight: 700,
        },

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(24),
            textAlign: 'left',
        },
    }
}))

interface IProps extends TitleProps {
    asLink?: boolean
    variant?: 'grayscale' | 'default'
}

const Brand = ({asLink, variant, ...others}: IProps) => {
    const {classes} = useStyles();

    return (
        asLink ?
            <UnstyledButton component={Link} to="/">
                <Title className={variant === 'grayscale' ? classes.white : classes.title} {...others}>
                    The 
                    <Text component="span" className={variant === 'grayscale' ? '' : classes.highlight} inherit>
                        Give 
                    </Text>
                    Hub
                </Title>
            </UnstyledButton> :
            <Title className={classes.title} {...others}>
                The
                <Text component="span" className={classes.highlight} inherit>
                   Give 
                </Text>
                Hub
            </Title>
    );
};

export default Brand;
