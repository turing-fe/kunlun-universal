import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { request } from '~/lib/request'

export type NoteItems = {
  notes: {
    name: string
    matter: {
      [K: string]: any
      /** 标题 */
      'title'?: string
      /** 封面 */
      'cover'?: string
      /** 简介 */
      'introduction'?: string
      /** 是否推荐 */
      'recommend'?: boolean
      /** 星级 */
      'star'?: number
      /** 标签 */
      'tags'?: string[]
      /** 分类 */
      'categories'?: string[]
      /** 阅读数 */
      'views'?: number
      /** 是否草稿 */
      'draft'?: boolean
      /** 发布时间 */
      'publishAt'?: string
      /** @context */
      '@context'?: 'http://schema.org'
      /** @type */
      '@type'?: string
      /** mainEntityOfPage */
      'mainEntityOfPage'?: {
        '@type': string
        '@id': string
      }
      /** 标题 */
      'headline'?: string
      /** 发布时间 */
      'datePublished'?: string
      /** 修改时间 */
      'dateModified'?: string
      /** 作者 */
      'author'?:
        | string
        | {
            '@type': 'Person' | 'Organization'
            'name': string
            'url': string
          }
      /** 发布者 */
      'publisher'?: {
        '@type': 'Person' | 'Organization'
        'name': string
      }
      /** 文章内容 */
      'articleBody'?: string
      /** 图片 */
      'image'?: {
        '@type': 'ImageObject'
        'url': string
        'height': number
        'width': number
      }
    }
  }[]
}

export const loader: LoaderFunction = async () => {
  const response = await request.get('/api/notes')
  const notes = response.data as NoteItems['notes']
  // for (const note of notes) {
  //   const title = await convert(note.matter.title)
  //   note.matter.title = title
  // }
  return json<NoteItems>({
    notes
  })
}

export default function NotesRoute() {
  const { notes } = useLoaderData() as NoteItems

  return (
    <div>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="items-end justify-between sm:flex">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold tracking-tight sm:text-3xl">
                技术文档
              </h2>
              <p className="mt-8 max-w-lg text-gray-500">
                技术文档的一站式收录与创作平台
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {notes.map(({ name, matter }, ix) => {
              return (
                <Link key={matter.title} to={`/notes/${name?.split('.')[0]}`}>
                  <blockquote className="group relative block h-full">
                    <span className="absolute inset-0 rounded-md border border-dashed border-gray-400"></span>
                    <div className="flex h-full flex-col justify-between rounded-md border border-gray-400 bg-white p-6 transition group-hover:-translate-x-2 group-hover:-translate-y-2">
                      <div>
                        <div className="flex justify-between">
                          <span className="flex space-x-0.5 text-orange-400">
                            {[...Array(matter.star || 0)].map((_, inx) => {
                              return (
                                <svg
                                  key={`${ix}.${inx}`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              )
                            })}
                          </span>
                          <span className="text-xs text-gray-400">
                            {matter.views} views
                          </span>
                        </div>
                        <div className="mt-4">
                          <h6 className="text-base font-bold text-pink-600 sm:text-lg">
                            {matter.title}
                          </h6>
                          <p className="mt-2 text-sm text-gray-600">
                            {matter.introduction}
                          </p>
                        </div>
                      </div>
                      <footer className="mt-8 flex justify-between text-xs text-gray-500">
                        <span>{matter.author as string}</span>
                        <span>{matter.publishAt}</span>
                      </footer>
                    </div>
                  </blockquote>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
