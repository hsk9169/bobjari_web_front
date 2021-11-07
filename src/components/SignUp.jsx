import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import PhoneIcon from '@mui/icons-material/Call';
import ProfileIcon from '@mui/icons-material/PersonAdd';
import RoleIcon from '@mui/icons-material/SettingsAccessibility';
import DoneIcon from '@mui/icons-material/Done';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const prefixes = [
  {
    value: '010',
    label: '010',
  },
  {
    value: '011',
    label: '011',
  },
  {
    value: '017',
    label: '017',
  },
  {
    value: '019',
    label: '019',
  },
];

export default function SignUp() {

    const [numbers, setNumber] = React.useState({
        middle: '',
        last: ''
    });

    const [prefix, setPrefix] = React.useState('010');

    const handleNumberChange = (event) => {
        setNumber({
            ...numbers,
            [event.target.id]: event.target.value,
        });
    };

    const handlePrefixChange = (event) => {
        setPrefix(event.target.value);
    };

    const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
          color: '#784af4',
        }),
        '& .QontoStepIcon-completedIcon': {
          color: '#784af4',
          zIndex: 1,
          fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'currentColor',
        },
    }));
      
      function QontoStepIcon(props) {
        const { active, completed, className } = props;
      
        return (
          <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
              <Check className="QontoStepIcon-completedIcon" />
            ) : (
              <div className="QontoStepIcon-circle" />
            )}
          </QontoStepIconRoot>
        );
      }
      
      QontoStepIcon.propTypes = {
        /**
         * Whether this step is active.
         * @default false
         */
        active: PropTypes.bool,
        className: PropTypes.string,
        /**
         * Mark the step as completed. Is passed to child components.
         * @default false
         */
        completed: PropTypes.bool,
      };


    const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
          top: 22,
        },
        [`&.${stepConnectorClasses.active}`]: {
          [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
              'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
          },
        },
        [`&.${stepConnectorClasses.completed}`]: {
          [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
              'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
          },
        },
        [`& .${stepConnectorClasses.line}`]: {
          height: 3,
          border: 0,
          backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
          borderRadius: 1,
        },
    }));

    const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 35,
        height: 35,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
          backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
          boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        }),
        ...(ownerState.completed && {
          backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        }),
    }));


    function ColorlibStepIcon(props) {
        const { active, completed, className } = props;
      
        const icons = {
          1: <PhoneIcon />,
          2: <ProfileIcon />,
          3: <RoleIcon />,
          4: <DoneIcon />,
        };
      
        return (
          <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
          </ColorlibStepIconRoot>
        );
    }
      
    ColorlibStepIcon.propTypes = {
        /**
         * Whether this step is active.
         * @default false
         */
        active: PropTypes.bool,
        className: PropTypes.string,
        /**
         * Mark the step as completed. Is passed to child components.
         * @default false
         */
        completed: PropTypes.bool,
        /**
         * The label displayed in the step icon.
         */
        icon: PropTypes.node,
    };
    const steps = ['휴대폰 인증', '프로필 입력', '밥자리 활동 선택', '완료'];

    return (
      <div>
      <Box justifyContent='center' alignItems='center' sx={{
          pt:2, 
          pb:4, 
          maxWidth:400,
          }}
      >
        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper alternativeLabel activeStep={0} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>
                            <Typography variant='body2'>
                                {label}
                            </Typography>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
      </Box>
      <Stack direction='column' spacing={2}>
        <Box sx={{
                px: 2,
                pb: 2,
                margin: 2,
                maxWidth: 400,
              }}
        >
          <Typography variant='h4' sx={{ pt: 2, pb: 2, fontWeight: 'fontWeigntBold' }}>
            휴대폰 인증
          </Typography>
          <Typography variant='subtitle1'>
            원활한 서비스를 위해<br/>휴대폰 번호를 입력해주세요
          </Typography>
        </Box>
        <Stack direction='row' spacing={2} justifyContent="center" alignItems="flex-start">
            <TextField
              id='prefix'
              select
              value={prefix}
              onChange={handlePrefixChange}
              helperText="선택해주세요"
              variant="standard"
              sx={{width: 80}}
              size='normal'
            >
              {prefixes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id='middle'
              value={numbers.middle}
              onChange={handleNumberChange}
              variant='standard'
              sx={{width: 80}}
            >
            </TextField>
            <TextField
              id='last'
              value={numbers.last}
              onChange={handleNumberChange}
              variant='standard'
              sx={{width: 80}}
            >
            </TextField>
        </Stack>
      </Stack>
      </div>
    );
}