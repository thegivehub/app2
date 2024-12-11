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

import { data } from '../i18n/en.json';

const PageData = data.pages.createCampaign;

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
        <title>{PageData.createCampaignTitle}</title>
      </Helmet>
      <Box>
        <Container my={36}>
          <Title mb="xl" align="center">
            {PageData.createCampaignTitle}
          </Title>
          <Stepper active={active} onStepClick={setActive} breakpoint="sm">
            <Stepper.Step
              label={PageData.getStarted}
              description={PageData.setDetailsTitle}>
              <Title {...titleProps}>{PageData.campaignInformationTitle}</Title>
              <Paper {...paperProps}>
                <SimpleGrid
                  cols={2}
                  breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                  <TextInput
                    label={PageData.campaignTitle}
                    required
                    placeholder={PageData.campaignTitlePlaceholder}
                  />
                  <CategorySelect />
                </SimpleGrid>
              </Paper>
              <Paper {...paperProps}>
                <Title {...subTitleProps}>
                  {PageData.campaignLocationTitle}
                </Title>
                <Text size="sm" mb="sm">
                  {PageData.campaignLocationDescription}
                </Text>
                <SimpleGrid
                  cols={2}
                  breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                  <CountrySelect />
                  <TextInput
                    label={PageData.cityLabel}
                    placeholder={PageData.cityPlaceholder}
                  />
                </SimpleGrid>
              </Paper>
              <Paper {...paperProps}>
                <Stack spacing="sm">
                  <Title {...subTitleProps}>
                    {PageData.donationInformationTitle}
                  </Title>
                  <CurrencySelect />
                  <Radio.Group
                    label={PageData.fundraiserTypeQuestion}
                    value={target}
                    onChange={setTarget}>
                    <Group mt="xs">
                      <Radio
                        value={PageData.deadlineLabel}
                        label={PageData.endDateOptionTitle}
                      />
                      <Radio
                        value="no-deadline"
                        label={PageData.ongoingOptionTitle}
                      />
                    </Group>
                  </Radio.Group>
                  <Paper {...paperProps}>
                    {target === PageData.deadlineLabel ? (
                      <Stack spacing="xs">
                        <Text size="sm">{PageData.specificEndDateTitle}</Text>
                        <Text size="sm">{PageData.deadlineDescription}</Text>
                        <DateInput
                          value={deadlineDate}
                          onChange={setDeadlineDate}
                          label={PageData.deadlineLabel}
                          placeholder={PageData.deadlinePlaceholder}
                          required
                          icon={<IconCalendar size={18} />}
                        />
                        <NumberInput
                          label={PageData.targetAmountLabel}
                          icon={<IconCurrencyDollar size={18} />}
                        />
                        <Checkbox label={PageData.overfundingQuestion} />
                      </Stack>
                    ) : (
                      <Stack spacing="xs">
                        <Text size="sm">{PageData.ongoingOptionTitle}</Text>
                        <Text size="sm"></Text>
                        <Checkbox
                          checked={minimumCheck}
                          onChange={(event) =>
                            setMinimumCheck(event.currentTarget.checked)
                          }
                          label={PageData.fixedAmountDescription}
                        />
                        {minimumCheck && (
                          <NumberInput
                            required
                            label={PageData.targetAmountLabel}
                            icon={<IconCurrencyDollar size={18} />}
                          />
                        )}
                      </Stack>
                    )}
                  </Paper>
                </Stack>
              </Paper>
              <Paper {...paperProps}>
                <Title {...subTitleProps}>{PageData.donationTypeTitle}</Title>
                <SegmentedControl
                  size="md"
                  value={donationType}
                  onChange={setDonationType}
                  data={[
                    { label: 'Any (popular option)', value: 'any' },
                    { label: 'Minimum', value: 'minimum' },
                    { label: 'Fixed', value: 'fixed' },
                  ]}
                  mb="sm"
                />
                {donationType === 'minimum' ? (
                  <NumberInput label={PageData.minimumAmountLabel} />
                ) : (
                  <NumberInput label={PageData.maximumAmountLabel} />
                )}
                <Checkbox label={PageData.multiLanguageQuestion} mt="sm" />
              </Paper>
              <Paper {...paperProps}>
                <Stack spacing="sm">
                  <Title {...subTitleProps}>
                    {PageData.fundAndRegistrationDetailsTitle}
                  </Title>
                  <Text size="sm">*{PageData.receiverNameDescription}</Text>
                  <SimpleGrid
                    cols={2}
                    breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                    <TextInput label={PageData.firstNameLabel} />
                    <TextInput label={PageData.lastNameLabel} />
                  </SimpleGrid>
                  <FileDropzone
                    label={PageData.profilePictureLabel}
                    description={PageData.profilePictureDescription}
                  />
                  <Checkbox
                    label={
                      <>
                        {PageData.termsAgreement1}{' '}
                        <Anchor href="#" target="_blank">
                          {PageData.termsAgreement2}
                        </Anchor>
                      </>
                    }
                  />
                </Stack>
              </Paper>
            </Stepper.Step>
            <Stepper.Step
              label="Campaign story"
              description="Tell your story! Add your description, images, videos and more">
              <Title {...titleProps}>Your campaign story</Title>
              <Paper {...paperProps}>
                <Stack spacing="sm">
                  <Text size="sm">
                    Explain why you&apos;re raising money, what the funds will
                    be used for, and how much you value the support
                  </Text>
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
                    label="Upload fundraiser photos"
                    description="You can select and upload several in one go"
                  />
                  <TextInput
                    label="Video URL"
                    description="The inclusion of a personalized video can help your fundraiser raise more money. We support links from YouTube and Vimeo. Simply copy paste your video link into the field below."
                    icon={<IconLink size={18} />}
                  />
                </Stack>
              </Paper>
            </Stepper.Step>
            <Stepper.Step
              label="Final details"
              description="Add team members, customize visibility, and more">
              <Title {...titleProps}>Final details</Title>
              <Paper {...paperProps}>
                <Stack spacing="sm">
                  <Title {...subTitleProps}>Manage Team</Title>
                  <Text size="sm">
                    If there&apos;s more than one person that's responsible for
                    this fundraiser and you'd like them to get public credit and
                    help manage this page, invite them via email.
                  </Text>
                  <Text size="sm">
                    Team members will be shown on your page along with their
                    role. Please remember, team members can change all elements
                    of the page.
                  </Text>
                  <Alert
                    color="orange"
                    variant="light"
                    icon={<IconInfoCircleFilled size={18} />}>
                    You haven't invited anyone to help manage this fundraiser
                    yet.
                  </Alert>
                  <SimpleGrid
                    cols={2}
                    breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                    <TextInput label="First name" />
                    <TextInput label="Last name" />
                    <TextInput label="Email" mb="xs" />
                    <TextInput
                      label="Role"
                      placeholder="e.g. Social media manager, funds manager"
                      mb="xs"
                    />
                  </SimpleGrid>
                  <Button
                    leftIcon={<IconMail size={18} />}
                    mx="auto"
                    variant="light">
                    Send invite via email
                  </Button>
                </Stack>
              </Paper>
              <Paper {...paperProps}>
                <Title {...subTitleProps}>Visibility</Title>
                <Stack spacing="sm">
                  <Checkbox label="Allow your fundraiser to be shown under user created groups." />
                  <Checkbox label="Check this box if you would like to hide your campaign on our site. Only those that you send the URL to will be able to find it and donate." />
                  <Checkbox label="Check if you would like to stop search engines such as Google indexing this page." />
                  <Checkbox label="Check if you would like to add a password to your fundraising page. Only those with the password will be able to view and donate to the campaign." />
                </Stack>
              </Paper>
              <Paper {...paperProps}>
                <Title {...subTitleProps}>Social media links</Title>
                <Text size="sm">
                  Is this fundraiser shown in other places? If so, add links to
                  those pages.
                </Text>
                <Box>
                  {socialFields.length > 0 ? (
                    <Flex mb="xs"></Flex>
                  ) : (
                    <Text color="dimmed" align="center" my="md">
                      Add social media link
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
                      Add new social link
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
            <Stepper.Step label="Payment methods" description="Get full access">
              <Title {...titleProps}>Fundraiser Payment Methods</Title>
              <Paper {...paperProps}>
                <Stack spacing="sm">
                  <Title {...subTitleProps}>
                    Enable payment processors for your fundraising page
                  </Title>
                  <Alert icon={<IconCurrency size={18} />} color="blue">
                    You can enable GGF Card Payments (powered by MangoPay) if
                    you switch your currency from GBP to USD{' '}
                  </Alert>
                  <Text size="sm">Available payment methods</Text>
                  <Group>
                    <Button
                      variant="light"
                      leftIcon={<IconBrandPaypal size={18} />}>
                      Connect with Paypal
                    </Button>
                    <Button
                      variant="light"
                      leftIcon={<IconBrandGoogle size={18} />}>
                      Connect with Google Pay
                    </Button>
                    <Button
                      variant="light"
                      leftIcon={<IconBrandApple size={18} />}>
                      Connect with Apple Pay
                    </Button>
                  </Group>
                </Stack>
              </Paper>
            </Stepper.Step>
            <Stepper.Completed>
              <Title {...titleProps} align="center" my="xl">
                Completed, take a seat while we finish setting up things for you
              </Title>
            </Stepper.Completed>
          </Stepper>

          <Group position="center" mt="xl">
            <Button
              variant="default"
              onClick={prevStep}
              leftIcon={<IconChevronLeft size={18} />}>
              Back
            </Button>
            {active < 4 ? (
              <Button
                onClick={nextStep}
                leftIcon={<IconChevronRight size={18} />}>
                Next step
              </Button>
            ) : (
              <Button
                component="a"
                href="/dashboard"
                leftIcon={<IconCheck size={18} />}>
                Launch campaign
              </Button>
            )}
          </Group>
        </Container>
      </Box>
    </>
  );
};

export default CreateCampaignPage;
