'use client'
import { useState } from 'react'
import { Button } from '@/src/components/atoms/common/Button'
import Section from '@/src/components/atoms/common/Section'
import Dropdown from '@/src/components/molecules/popover/Dropdown'
import Modal from '@/src/components/molecules/popover/Modal'
import PlusIcon from '@/src/components/atoms/icons/PlusIcon'
import Drawer from '@/src/components/molecules/popover/Drawer'

export default function PopoverComponents() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false)
  const [isPrimaryModalOpen, setIsPrimaryModalOpen] = useState(false)
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false)
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false)
  const [isDropdownOpen3, setIsDropdownOpen3] = useState(false)
  const [isDropdownOpen4, setIsDropdownOpen4] = useState(false)
  const [isSecondaryModalOpen, setSecondaryIsModalOpen] = useState(false)
  const [isMainModalOpen, setMainIsModalOpen] = useState(false)

  return (
    <div className='items-strech mt-8 flex w-full flex-wrap justify-between gap-4'>
      <Section className='relative w-full overflow-hidden' type='center' title={'Drawer'}>
        <div className='flex h-72 flex-col items-center justify-center gap-4 md:flex-row'>
          <Drawer
            type='left'
            isOpen={isDrawerOpen}
            setIsOpen={setIsDrawerOpen}
            drawerButton={
              <Button className={isDrawerOpen ? 'selected' : ''} onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                Left Drawer
              </Button>
            }
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ratione molestias quam distinctio
            laudantium quidem dolore, dolorem quos doloremque facilis corporis debitis ipsam. Omnis natus adipisci
            aliquam minus, ipsa sequi dolores beatae modi corporis eius quaerat, distinctio sunt voluptatum iste quasi.
            Veritatis quam pariatur nemo velit? Vel dolorem aliquid veritatis!
          </Drawer>
          <Drawer
            type='right'
            isOpen={isRightDrawerOpen}
            setIsOpen={setIsRightDrawerOpen}
            drawerButton={
              <Button
                className={isRightDrawerOpen ? 'selected' : ''}
                onClick={() => setIsRightDrawerOpen(!isRightDrawerOpen)}
              >
                Right Drawer
              </Button>
            }
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum ratione molestias quam distinctio
            laudantium quidem dolore, dolorem quos doloremque facilis corporis debitis ipsam. Omnis natus adipisci
            aliquam minus, ipsa sequi dolores beatae modi corporis eius quaerat, distinctio sunt voluptatum iste quasi.
            Veritatis quam pariatur nemo velit? Vel dolorem aliquid veritatis!
          </Drawer>
        </div>
      </Section>

      <Section className='w-full md:w-[48%]' type='center' title={'Modal'}>
        <div className='my-12 flex flex-col items-center'>
          <Button
            className='mb-8'
            style='menu'
            size='lg'
            role='combobox'
            aria-haspopup='dialog'
            aria-expanded={isMainModalOpen}
            aria-controls='mainModal'
            onClick={() => setMainIsModalOpen(true)}
          >
            Open Main Modal
          </Button>
          <Button
            className='mb-8'
            style='primary'
            size='lg'
            role='combobox'
            aria-haspopup='dialog'
            aria-expanded={isPrimaryModalOpen}
            aria-controls='primaryModal'
            onClick={() => setIsPrimaryModalOpen(true)}
          >
            Open Primary Modal
          </Button>
          <Button
            style='secondary'
            size='lg'
            role='combobox'
            aria-haspopup='dialog'
            aria-expanded={isSecondaryModalOpen}
            aria-controls='secondaryModal'
            onClick={() => setSecondaryIsModalOpen(true)}
          >
            Open Secondary Modal
          </Button>
          <Modal name='mainModal' isOpen={isMainModalOpen} title='Main Modal' setIsOpen={setMainIsModalOpen}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi accusantium saepe ut omnis repudiandae, vel
            eos dolor explicabo quia voluptas sed maiores nesciunt architecto magnam neque natus similique suscipit
            alias, rem distinctio nostrum illum labore! Assumenda nesciunt nisi natus totam, repellat nam ullam
            doloremque enim pariatur distinctio non eligendi temporibus.
          </Modal>
          <Modal
            name='primaryModal'
            isOpen={isPrimaryModalOpen}
            title='Primary Modal'
            style='primary'
            setIsOpen={setIsPrimaryModalOpen}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi accusantium saepe ut omnis repudiandae, vel
            eos dolor explicabo quia voluptas sed maiores nesciunt architecto magnam neque natus similique suscipit
            alias, rem distinctio nostrum illum labore! Assumenda nesciunt nisi natus totam, repellat nam ullam
            doloremque enim pariatur distinctio non eligendi temporibus.
          </Modal>
          <Modal
            name='secondaryModal'
            style='secondary'
            isOpen={isSecondaryModalOpen}
            title='Secondary Modal'
            setIsOpen={setSecondaryIsModalOpen}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id rerum dicta eum nostrum eius. Praesentium,
            explicabo repellat blanditiis fugit, deleniti autem id iste quo reprehenderit exercitationem quos odio dolor
            possimus eaque esse vitae eveniet a enim incidunt labore necessitatibus debitis obcaecati dolore corporis!
            Non, totam. Itaque aliquid ratione, doloremque dignissimos illo in provident blanditiis possimus
            consequuntur rerum! Dicta sequi maiores rerum nesciunt veniam incidunt iste nam iusto sapiente odio
            doloribus sint quis repellendus pariatur, assumenda enim consequuntur dolore repellat. Inventore placeat est
            beatae repudiandae nihil molestias nesciunt blanditiis unde quos illo ipsa omnis, quaerat excepturi quas
            sequi expedita nam totam eum, esse nulla animi distinctio incidunt ea assumenda! Adipisci similique aut
            rerum animi assumenda mollitia voluptatum. Praesentium adipisci voluptatibus maxime rerum cupiditate
            provident aliquam dolorum. Autem dolores ipsa tempora. Est suscipit quae itaque possimus omnis. Dolorum rem
            nobis error eaque incidunt harum est? Maxime quaerat accusantium quam suscipit iste ullam doloremque, quod
            non error molestiae ratione ipsam expedita provident tempore eum, hic quisquam vel nam velit fuga nostrum
            eveniet voluptate deleniti. Adipisci maiores architecto quia possimus quidem omnis consectetur eligendi
            voluptatem rem vel, nam saepe iusto temporibus magni dolore error neque necessitatibus ea provident fugit
            ullam sed. Velit iste cupiditate corporis quia quisquam cumque? Ipsa magnam rem magni blanditiis eius unde
            nesciunt quae, possimus sequi totam ullam omnis nobis perspiciatis eaque laudantium corrupti quos quod
            explicabo et. Dolore aspernatur ipsa totam sit veritatis eum exercitationem tempore magni iste accusamus
            eos, eius minima, alias numquam repellendus ipsum impedit obcaecati. Recusandae repellendus provident labore
            dolorum facere at laborum! Reprehenderit aliquid aspernatur eum accusantium beatae iure voluptatem
            exercitationem nemo quidem quia quam natus quae aperiam, iste iusto alias voluptatibus voluptate commodi
            magnam consectetur hic ut ducimus suscipit! Soluta facere quidem molestias hic consequuntur neque eaque
            beatae? Pariatur quisquam enim perferendis laborum voluptates fugiat ratione, praesentium architecto! Fugiat
            pariatur ipsa quidem blanditiis, alias reiciendis at itaque excepturi corporis voluptatem architecto facilis
            cum nostrum maxime sapiente, natus vitae numquam nisi beatae placeat debitis. Itaque non soluta incidunt
            obcaecati, illum sed animi beatae dolore, enim sint cupiditate velit id quis eveniet tempora, tenetur iure
            qui et iste consequuntur laudantium? Officiis modi animi placeat, aliquid dolor maiores corporis quidem
            unde, blanditiis esse consequatur incidunt. Suscipit animi possimus porro vel, praesentium repellat omnis ea
            perspiciatis ipsam accusantium magni accusamus corrupti quaerat illum aliquid corporis magnam tempore ipsum
            eligendi placeat quas rem quis ratione. Odit reiciendis neque quos numquam molestiae in hic nisi corporis
            ratione accusamus, minima pariatur quo voluptates qui quisquam fuga tempore architecto exercitationem
            assumenda sunt placeat possimus? Excepturi minima officiis hic ipsa ab eveniet esse accusamus earum vero.
            Sunt, id tempora vel fugit vitae laborum eligendi quod nulla quos voluptatem dolor voluptates est blanditiis
            ipsum, accusantium odit sint ex, doloremque repellendus. Dicta ut quae unde vitae pariatur, earum eum nisi
            incidunt laboriosam a, alias aliquid accusamus, autem quibusdam molestias excepturi! Veritatis obcaecati
            nihil maxime sint laudantium aperiam placeat natus dolor. Odio, dolorum aliquid? Consequuntur eos deleniti
            placeat nisi, et distinctio quasi magnam unde rem, voluptate commodi.
          </Modal>
        </div>
      </Section>

      <Section className='z-10 w-full md:w-[48%]' type='center' title={'Dropdown'}>
        <div className='my-12 flex h-[10rem] w-full flex-col items-start justify-start'>
          <Dropdown isOpen={isDropdownOpen1} setIsOpen={setIsDropdownOpen1} className='mb-4' size='lg' title='Primary'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum provident suscipit in aliquam mollitia est
            aliquid cumque blanditiis expedita, sapiente magni doloremque vitae quis fugiat ad? Numquam quod facere non
            repellat exercitationem, eius in ea, porro iste soluta voluptates obcaecati est explicabo fugit voluptatem
            magnam! Hic, id. Veniam excepturi consequatur adipisci quis asperiores! Architecto sed at placeat
            laboriosam, nesciunt animi adipisci inventore rerum nam, optio pariatur sit magni minus obcaecati culpa
            consequatur quidem porro voluptatem atque ab. Natus consequatur perspiciatis nemo nihil nam dicta adipisci
            eveniet totam laudantium libero voluptatum, iure ullam ab. Rem culpa tempora aut, aperiam non quae saepe
            provident, doloribus possimus corporis minima quidem velit molestias vitae, esse illum iusto labore!
          </Dropdown>
          <Dropdown
            isOpen={isDropdownOpen2}
            setIsOpen={setIsDropdownOpen2}
            style='secondary'
            size='lg'
            title='Secondary'
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum provident suscipit in aliquam mollitia est
            aliquid cumque blanditiis expedita, sapiente magni doloremque vitae quis fugiat ad? Numquam quod facere non
            repellat exercitationem, eius in ea, porro iste soluta voluptates obcaecati est explicabo fugit voluptatem
            magnam! Hic, id. Veniam excepturi consequatur adipisci quis asperiores! Architecto sed at placeat
            laboriosam, nesciunt animi adipisci inventore rerum nam, optio pariatur sit magni minus obcaecati culpa
            consequatur quidem porro voluptatem atque ab. Natus consequatur perspiciatis nemo nihil nam dicta adipisci
            eveniet totam laudantium libero voluptatum, iure ullam ab. Rem culpa tempora aut, aperiam non quae saepe
            provident, doloribus possimus corporis minima quidem velit molestias vitae, esse illum iusto labore!
          </Dropdown>
          <div className='flex w-full justify-between'>
            <Dropdown
              isOpen={isDropdownOpen3}
              setIsOpen={setIsDropdownOpen3}
              type='top'
              style='primary'
              title={<PlusIcon />}
              width='w-56'
              hideChevron
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum provident suscipit in aliquam mollitia est
              aliquid cumque blanditiis expedita, sapiente magni doloremque
            </Dropdown>
            <Dropdown
              isOpen={isDropdownOpen4}
              setIsOpen={setIsDropdownOpen4}
              type='right'
              style='secondary'
              title={<PlusIcon />}
              width='w-56'
              hideChevron
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum provident suscipit in aliquam mollitia est
              aliquid cumque blanditiis expedita, sapiente magni doloremque
            </Dropdown>
          </div>
        </div>
      </Section>
    </div>
  )
}
