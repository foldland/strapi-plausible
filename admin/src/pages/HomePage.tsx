import {
  EmptyStateLayout,
  Field,
  Main,
  SingleSelect,
  SingleSelectOption,
  Typography,
} from '@strapi/design-system'
import { EmptyData } from '@strapi/icons/symbols'
import { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

interface Domain {
  name: string
  auth: string
}
interface Config {
  plausibleInstance: string
  domains: Array<Domain>
}

const HomePage = () => {
  const [config, setConfig] = useState<Config | null>(null)
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null)
  const { formatMessage } = useIntl()

  const fetchConfig = useCallback(async () => {
    try {
      const response = await fetch('/plausible/config')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setConfig(data)

      // Set the first domain as selected if available
      if (data?.domains.length > 0) {
        setSelectedDomain(data.domains[0])
      }
    } catch (error) {
      console.error('Failed to fetch config:', error)
    }
  }, [])

  useEffect(() => {
    fetchConfig()
  }, [fetchConfig])

  return (
    <Main>
      <header
        style={{
          maxWidth: '1280px',
          padding: '40px 24px 0px 24px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography fontWeight="bold" textColor="neutral800" variant="alpha">
            {formatMessage({ id: 'page.title' })}
          </Typography>
          <Typography textColor="neutral600" variant="epsilon">
            {formatMessage({ id: 'page.description' })}
          </Typography>
        </div>
        <Field.Root>
          <Field.Label>
            {formatMessage({
              id: 'select.domain.label',
              defaultMessage: 'Select Domain',
            })}
          </Field.Label>
          <SingleSelect
            disabled={!config || config.domains.length === 0}
            onChange={(value: string | number) => {
              if (typeof value === 'number') {
                return
              }

              const domain = config?.domains.find((d) => {
                return d.name === value
              })
              setSelectedDomain(domain || null)
            }}
            placeholder={formatMessage({
              id: 'select.domain.placeholder',
              defaultMessage: 'Select a domain',
            })}
            value={selectedDomain?.name ?? ''}
          >
            {config?.domains.map((domain) => {
              return (
                <SingleSelectOption key={domain.name} value={domain.name}>
                  {domain.name}
                </SingleSelectOption>
              )
            })}
          </SingleSelect>
        </Field.Root>
      </header>
      {config && config.domains.length > 0 ? (
        <>
          {selectedDomain ? (
            <iframe
              frameBorder={0}
              loading="lazy"
              scrolling="no"
              src={`${config.plausibleInstance}/share/${selectedDomain.name}?auth=${selectedDomain.auth}&embed=true&theme=light&background=%23F6F6F9`}
              style={{ width: '1px', minWidth: '100%', height: '2000px' }}
              title="Plausible Analytics"
            />
          ) : null}
          <script
            async={true}
            src={`${config.plausibleInstance}/js/embed.host.js`}
          />
        </>
      ) : (
        <div
          style={{
            maxWidth: '1280px',
            padding: '40px 24px 0px 24px',
            margin: '0 auto',
          }}
        >
          <EmptyStateLayout
            content={formatMessage({
              id: 'empty.state.content',
              defaultMessage: "You don't have any domains configured.",
            })}
            icon={<EmptyData height={500} width={500} />}
          />
        </div>
      )}
    </Main>
  )
}

export { HomePage }
