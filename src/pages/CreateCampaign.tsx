import { Helmet } from 'react-helmet';
import {
  ActionIcon,
  Alert,
  Anchor,
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Group,
  NumberInput,
  Paper,
  PaperProps,
  Radio,
  SegmentedControl,
  Select,
  SimpleGrid,
  Stack,
  Stepper,
  Text,
  TextInput,
  Title,
  TitleProps,
  useMantineTheme,
} from '@mantine/core';
import { Link, RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import React, { forwardRef, useState } from 'react';
import { DateInput } from '@mantine/dates';
import {
  IconBrandApple,
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandLinkedin,
  IconBrandPaypal,
  IconBrandTwitter,
  IconBrandWhatsapp,
  IconBrandYoutube,
  IconCalendar,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconCurrency,
  IconCurrencyDollar,
  IconInfoCircleFilled,
  IconLink,
  IconMail,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import { randomId } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  CategorySelect,
  CountrySelect,
  CurrencySelect,
  FileDropzone,
} from '../components';

interface ISocialProps {
  icon: React.FC<any>;
  title: React.ReactNode;
}

const SocialSelectItem = forwardRef<HTMLDivElement, ISocialProps>(
  ({ title, icon: Icon, ...others }: ISocialProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Icon size={18} stroke={1.5} />
        <Text size="sm" transform="capitalize">
          {title}
        </Text>
      </Group>
    </div>
  )
);

// Languages will need to be further handled. This is just a placeholder.
const languages = ['en', 'es', 'fr', 'de', 'pt'];

import { data } from '../i18n/es.json';

const pageData = data.pages.createCampaign;

const CreateCampaignPage = () => {
  const theme = useMantineTheme();
  const [active, setActive] = useState(0);
  const [target, setTarget] = useState('deadline');
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
  const [donationType, setDonationType] = useState('any');
  const [minimumCheck, setMinimumCheck] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '',
  });

  const socialForm = useForm({
    initialValues: {
      employees: [{ name: '', active: false, key: randomId() }],
    },
  });

  const nextStep = () =>
    setActive((current: number) => (current < 4 ? current + 1 : current));
  const prevStep = () =>
    setActive((current: number) => (current > 0 ? current - 1 : current));

  const socialFields = socialForm.values.employees.map((item, index) => (
    <Group key={item.key} mt="xs">
      <Select
        aria-label="social"
        data={[
          { title: 'Facebook', icon: IconBrandFacebook },
          { title: 'Whatsapp', icon: IconBrandWhatsapp },
          { title: 'LinkedIn', icon: IconBrandLinkedin },
          { title: 'Twitter', icon: IconBrandTwitter },
          { title: 'Youtube', icon: IconBrandYoutube },
          { title: 'Other links', icon: IconLink },
        ].map((c) => ({ value: c.title, label: c.title, ...c }))}
        itemComponent={SocialSelectItem}
      />
      <TextInput
        placeholder="https://"
        sx={{ flex: 1 }}
        {...socialForm.getInputProps(`employees.${index}.name`)}
      />
      <ActionIcon
        color="red"
        onClick={() => socialForm.removeListItem('employees', index)}>
        <IconTrash size="1rem" />
      </ActionIcon>
    </Group>
  ));

  const titleProps: TitleProps = {
    size: 24,
    mb: 'md',
  };

  const subTitleProps: TitleProps = {
    size: 18,
    mb: 'sm',
  };

  const paperProps: PaperProps = {
    p: 'md',
    withBorder: false,
    shadow: 'sm',
    mb: 'md',
    sx: { backgroundColor: theme.white },
  };

  return (
    <>
      <Helmet>
        <title>{pageData.createCampaignTitle}</title>
      </Helmet>
      <Box>
        <Container my={36}>
          <Title mb="xl" align="center">
            {pageData.createCampaignTitle}
          </Title>
          <Stepper active={active} onStepClick={setActive} breakpoint="sm">
            <Stepper.Step
              label={pageData.getStarted}
              description={pageData.setDetailsTitle}>
              <Title {...titleProps}>{pageData.campaignInformationTitle}</Title>
              <Paper {...paperProps}>
                <SimpleGrid
                  cols={2}
                  breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                  <TextInput
                    label={pageData.campaignTitle}
                    required
                    placeholder={pageData.campaignTitlePlaceholder}
                  />
                  <CategorySelect />
                </SimpleGrid>
              </Paper>
              <Paper {...paperProps}>
                <Title {...subTitleProps}>
                  {pageData.campaignLocationTitle}
                </Title>
                <Text size="sm" mb="sm">
                  {pageData.campaignLocationDescription}
                </Text>
                <SimpleGrid
                  cols={2}
                  breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                  <CountrySelect />
                  <TextInput
                    label={pageData.cityLabel}
                    placeholder={pageData.cityPlaceholder}
                  />
                </SimpleGrid>
              </Paper>
              <Paper {...paperProps}>
                <Stack spacing="sm">
                  <Title {...subTitleProps}>
                    {pageData.donationInformationTitle}
                  </Title>
                  <CurrencySelect />
                  <Radio.Group
                    label={pageData.fundraiserTypeQuestion}
                    value={target}
                    onChange={setTarget}>
                    <Group mt="xs">
                      <Radio
                        value={pageData.deadline}
                        label={pageData.endDateOptionTitle}
                      />
                      <Radio
                        value="no-deadline"
                        label={pageData.ongoingOptionTitle}
                      />
                    </Group>
                  </Radio.Group>
                  <Paper {...paperProps}>
                    {target === pageData.deadline ? (
                      <Stack spacing="xs">
                        <Text size="sm">{pageData.specificEndDateTitle}</Text>
                        <Text size="sm">{pageData.deadlineDescription}</Text>
                        <DateInput
                          value={deadlineDate}
                          onChange={setDeadlineDate}
                          label={pageData.deadlineLabel}
                          placeholder={pageData.deadlinePlaceholder}
                          required
                          icon={<IconCalendar size={18} />}
                        />
                        <NumberInput
                          label={pageData.targetAmountLabel}
                          icon={<IconCurrencyDollar size={18} />}
                        />
                        <Checkbox label={pageData.overfundingQuestion} />
                      </Stack>
                    ) : (
                      <Stack spacing="xs">
                        <Text size="sm">{pageData.ongoingOptionTitle}</Text>
                        <Text size="sm"></Text>
                        <Checkbox
                          checked={minimumCheck}
                          onChange={(event) =>
                            setMinimumCheck(event.currentTarget.checked)
                          }
                          label={pageData.fixedAmountDescription}
                        />
                        {minimumCheck && (
                          <NumberInput
                            required
                            label={pageData.targetAmountLabel}
                            icon={<IconCurrencyDollar size={18} />}
                          />
                        )}
                      </Stack>
                    )}
                  </Paper>
                </Stack>
              </Paper>
              <Paper {...paperProps}>
                <Title {...subTitleProps}>{pageData.donationTypeTitle}</Title>
                <SegmentedControl
                  size="md"
                  value={donationType}
                  onChange={setDonationType}
                  data={[
                    {
                      label: `${pageData.dataLabelAny}`,
                      value: `${pageData.dataValueAny}`,
                    },
                    {
                      label: `${pageData.dataLabelMinimum}`,
                      value: `${pageData.dataValueMinimum}`,
                    },
                    {
                      label: `${pageData.dataLabelFixed}`,
                      value: `${pageData.dataValueFixed}`,
                    },
                  ]}
                  mb="sm"
                />
                {donationType === pageData.dataValueMinimum ? (
                  <NumberInput label={pageData.minimumAmountLabel} />
                ) : (
                  <NumberInput label={pageData.maximumAmountLabel} />
                )}
                <Checkbox label={pageData.multiLanguageQuestion} mt="sm" />
              </Paper>
              <Paper {...paperProps}>
                <Stack spacing="sm">
                  <Title {...subTitleProps}>
                    {pageData.fundAndRegistrationDetailsTitle}
                  </Title>
                  <Text size="sm">*{pageData.receiverNameDescription}</Text>
                  <SimpleGrid
                    cols={2}
                    breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                    <TextInput label={pageData.firstNameLabel} />
                    <TextInput label={pageData.lastNameLabel} />
                  </SimpleGrid>
                  <FileDropzone
                    label={pageData.profilePictureLabel}
                    description={pageData.profilePictureDescription}
                  />
                  <Checkbox
                    label={
                      <>
                        {pageData.termsAgreement1}{' '}
                        <Anchor href="#" target="_blank">
                          {pageData.termsAgreement2}
                        </Anchor>
                      </>
                    }
                  />
                </Stack>
              </Paper>
            </Stepper.Step>
            <Stepper.Step
              label={pageData.campaignStoryTitle}
              description={pageData.yourCampaignStoryDescription}>
              <Title {...titleProps}>{pageData.yourCampaignStory}</Title>
              <Paper {...paperProps}>
                <Stack spacing="sm">
                  <Text size="sm">{pageData.yourCampaignStoryPlaceholder}</Text>
                  <RichTextEditor editor={editor}>
                    <RichTextEditor.Toolbar sticky stickyOffset={60}>
                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Highlight />
                        <RichTextEditor.Code />
                      </RichTextEditor.ControlsGroup>

                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                      </RichTextEditor.ControlsGroup>

                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                      </RichTextEditor.ControlsGroup>

                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                      </RichTextEditor.ControlsGroup>

                      <RichTextEditor.ControlsGroup>
                        <RichTextEditor.AlignLeft />
                        <RichTextEditor.AlignCenter />
                        <RichTextEditor.AlignJustify />
                        <RichTextEditor.AlignRight />
                      </RichTextEditor.ControlsGroup>
                    </RichTextEditor.Toolbar>

                    <RichTextEditor.Content />
                  </RichTextEditor>
                  <FileDropzone
                    label={pageData.fileDropZoneLabel}
                    description={pageData.fileDropZoneDescription}
                  />
                  <TextInput
                    label={pageData.videoUrlLabel}
                    description={pageData.videoUrlDescription}
                    icon={<IconLink size={18} />}
                  />
                </Stack>
              </Paper>
            </Stepper.Step>
            <Stepper.Step
              label={pageData.finalDetailsTitle}
              description={pageData.editDetailsDescription}>
              <Title {...titleProps}>{pageData.finalDetailsTitle}</Title>
              <Paper {...paperProps}>
                <Stack spacing="sm">
                  <Title {...subTitleProps}>{pageData.manageTeam}</Title>
                  <Text size="sm">
                    {pageData.teamMembersInviteDescription1}
                  </Text>
                  <Text size="sm">
                    {pageData.teamMembersInviteDescription2}
                  </Text>
                  <Alert
                    color="orange"
                    variant="light"
                    icon={<IconInfoCircleFilled size={18} />}>
                    {pageData.teamMembersInviteAlert}
                  </Alert>
                  <SimpleGrid
                    cols={2}
                    breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                    <TextInput label={pageData.firstNameLabel} />
                    <TextInput label={pageData.lastNameLabel} />
                    <TextInput label={pageData.emailLabel} mb="xs" />
                    <TextInput
                      label={pageData.roleLabel}
                      placeholder={pageData.rolePlaceholder}
                      mb="xs"
                    />
                  </SimpleGrid>
                  <Button
                    leftIcon={<IconMail size={18} />}
                    mx="auto"
                    variant="light">
                    {pageData.sendInviteEmail}
                  </Button>
                </Stack>
              </Paper>
              <Paper {...paperProps}>
                <Title {...subTitleProps}>{pageData.visibility}</Title>
                <Stack spacing="sm">
                  <Checkbox label={pageData.visibilityCheckBox1} />
                  <Checkbox label={pageData.visibilityCheckBox2} />
                  <Checkbox label={pageData.visibilityCheckBox3} />
                  <Checkbox label={pageData.visibilityCheckBox4} />
                </Stack>
              </Paper>
              <Paper {...paperProps}>
                <Title {...subTitleProps}>{pageData.socialMediaLinks}</Title>
                <Text size="sm">{pageData.socialMediaDescription}</Text>
                <Box>
                  {socialFields.length > 0 ? (
                    <Flex mb="xs"></Flex>
                  ) : (
                    <Text color="dimmed" align="center" my="md">
                      {pageData.addSocialMediaLink}
                    </Text>
                  )}

                  {socialFields}

                  <Group position="center" mt="md">
                    <Button
                      leftIcon={<IconPlus size={18} />}
                      onClick={() =>
                        socialForm.insertListItem('employees', {
                          name: '',
                          active: false,
                          key: randomId(),
                        })
                      }
                      variant="light">
                      {pageData.addNewSocialLink}
                    </Button>
                  </Group>
                </Box>
              </Paper>
              <Paper {...paperProps}>
                <Select
                  label="How did you hear about us?"
                  data={[
                    'Search engine',
                    'Friends & family',
                    'Social media',
                    'Other',
                  ]}
                />
              </Paper>
            </Stepper.Step>
            <Stepper.Step
              label={pageData.paymentMethodsTitle}
              description={pageData.getFullAccess}>
              <Title {...titleProps}></Title>
              <Paper {...paperProps}>
                <Stack spacing="sm">
                  <Title {...subTitleProps}>
                    {pageData.enablePaymentProcessors}
                  </Title>
                  <Alert icon={<IconCurrency size={18} />} color="blue">
                    {pageData.enablePaymentProcessorsDescription}
                  </Alert>
                  <Text size="sm">{pageData.availablePaymentMethods}</Text>
                  <Group>
                    <Button
                      variant="light"
                      leftIcon={<IconBrandPaypal size={18} />}>
                      {pageData.connectWithPayPal}
                    </Button>
                    <Button
                      variant="light"
                      leftIcon={<IconBrandGoogle size={18} />}>
                      {pageData.connectWithGooglePay}
                    </Button>
                    <Button
                      variant="light"
                      leftIcon={<IconBrandApple size={18} />}>
                      {pageData.connectWithApplePay}
                    </Button>
                  </Group>
                </Stack>
              </Paper>
            </Stepper.Step>
            <Stepper.Completed>
              <Title {...titleProps} align="center" my="xl">
                {pageData.completedSteps}
              </Title>
            </Stepper.Completed>
          </Stepper>

          <Group position="center" mt="xl">
            <Button
              variant="default"
              onClick={prevStep}
              leftIcon={<IconChevronLeft size={18} />}>
              {pageData.navigateBack}
            </Button>
            {active < 4 ? (
              <Button
                onClick={nextStep}
                leftIcon={<IconChevronRight size={18} />}>
                {pageData.navigateNext}
              </Button>
            ) : (
              <Button
                component="a"
                href="/dashboard"
                leftIcon={<IconCheck size={18} />}>
                {pageData.navigateLaunch}
              </Button>
            )}
          </Group>
        </Container>
      </Box>
    </>
  );
};

export default CreateCampaignPage;
